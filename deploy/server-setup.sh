#!/usr/bin/env bash
# One-time VPS setup for khadimhussain.com. Run ON THE VPS as a sudo-capable user,
# from a checkout of this repo (or after copying the deploy/ folder over):
#
#   sudo DEPLOY_USER=deploy CERT_EMAIL=m.khadim012@gmail.com bash deploy/server-setup.sh
#
# Steps: folders → HTTP-only Nginx site → Let's Encrypt certificate → final HTTPS config.
# Only adds files for khadimhussain.com. Other sites on the server are not touched.
# Safe to re-run.
set -euo pipefail

DOMAIN="khadimhussain.com"
DEPLOY_USER="${DEPLOY_USER:?Set DEPLOY_USER to the SSH user GitHub Actions will deploy as}"
CERT_EMAIL="${CERT_EMAIL:-m.khadim012@gmail.com}"
HERE="$(cd "$(dirname "$0")" && pwd)"
SITE="/var/www/$DOMAIN"

[ "$(id -u)" -eq 0 ] || { echo "Run with sudo"; exit 1; }
command -v nginx >/dev/null || { echo "nginx is not installed"; exit 1; }

# Sites directory layout (Debian/Ubuntu vs conf.d)
if [ -d /etc/nginx/sites-available ]; then
  CONF="/etc/nginx/sites-available/$DOMAIN"; LINK="/etc/nginx/sites-enabled/$DOMAIN"
else
  CONF="/etc/nginx/conf.d/$DOMAIN.conf"; LINK=""
fi

# Strip IPv6 listeners when the host has no IPv6.
filter() { if [ -f /proc/net/if_inet6 ]; then cat "$1"; else sed '/listen \[::\]/d' "$1"; fi; }

echo "→ DNS check"
IP4="$(curl -4 -fsS https://api.ipify.org || true)"
for h in "$DOMAIN" "www.$DOMAIN"; do
  got="$(getent ahostsv4 "$h" | awk '{print $1; exit}')"
  echo "   $h -> ${got:-<none>} (this server: ${IP4:-unknown})"
  [ -n "$IP4" ] && [ "$got" != "$IP4" ] && { echo "   DNS for $h does not point here yet. Fix DNS, wait, re-run."; exit 1; }
done

echo "→ Folders"
mkdir -p "$SITE/releases" /var/www/letsencrypt /etc/nginx/snippets
if [ ! -e "$SITE/current" ]; then
  mkdir -p "$SITE/releases/initial"
  echo "<!doctype html><title>Khadim Hussain</title><p>Coming soon.</p>" > "$SITE/releases/initial/index.html"
  ln -sfn "$SITE/releases/initial" "$SITE/current"
fi
chown -R "$DEPLOY_USER":"$DEPLOY_USER" "$SITE"
cp "$HERE/nginx/$DOMAIN-headers.conf" /etc/nginx/snippets/

if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  echo "→ Temporary HTTP-only site for certificate validation"
  filter "$HERE/nginx/$DOMAIN.bootstrap.conf" > "$CONF"
  [ -n "$LINK" ] && ln -sfn "$CONF" "$LINK"
  nginx -t && systemctl reload nginx

  echo "→ Certificate"
  command -v certbot >/dev/null || { apt-get update && apt-get install -y certbot; }
  certbot certonly --webroot -w /var/www/letsencrypt \
    -d "$DOMAIN" -d "www.$DOMAIN" \
    --email "$CERT_EMAIL" --agree-tos --no-eff-email --non-interactive \
    --deploy-hook "systemctl reload nginx"
fi

echo "→ Final HTTPS config"
filter "$HERE/nginx/$DOMAIN.conf" > "$CONF"
[ -n "$LINK" ] && ln -sfn "$CONF" "$LINK"
nginx -t && systemctl reload nginx
certbot renew --dry-run --cert-name "$DOMAIN" >/dev/null && echo "   renewal dry-run OK"

echo "✓ Server ready. Push to main (or run the Deploy workflow) to publish the site."
