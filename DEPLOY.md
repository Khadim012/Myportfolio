# Deploying khadimhussain.com

## Current setup: GitHub Pages (live)

- **Host:** GitHub Pages, deployed by `.github/workflows/pages.yml` on every push to `main`.
- **Domain:** `khadimhussain.com`, set in repo Settings → Pages with HTTPS enforced. `public/CNAME` holds the domain.
- **DNS (Hostinger):**

| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | 300 |
| A | @ | 185.199.109.153 | 300 |
| A | @ | 185.199.110.153 | 300 |
| A | @ | 185.199.111.153 | 300 |
| CNAME | www | khadim012.github.io | 300 |

- **Workflow:** work on `development` → open a pull request to `main` → merge → the site updates in about a minute.
- **Roll back:** revert the commit on `main`, or re-run an older successful *Deploy to GitHub Pages* run.

---

# Alternative: self-hosting on a VPS

Everything below is only needed if you move the site from GitHub Pages to your own server.

The site is a **static export**. `next build` writes plain HTML, CSS, JS and images to `out/`, and Nginx serves that folder. **No Node.js runtime is needed on the server.** No feature in the site needs one.

Do not run any of the steps in sections 3–5 until you approve the production deployment. Nothing here touches DNS or your server until you run it.

Placeholders used below:

| Placeholder | Meaning |
| --- | --- |
| `VPS_IPV4` | Your VPS public IPv4 address (not provided yet) |
| `deploy` | The SSH user you deploy with (must be able to `sudo`) |

## Quick path: GitHub → VPS (recommended)

The code lives at <https://github.com/Khadim012/Myportfolio>. Every push to `main` builds the site, and once the secrets below are set, it deploys to the VPS and checks the live URLs (`.github/workflows/deploy.yml`).

1. **DNS:** add `A @ → VPS_IPV4` and `A www → VPS_IPV4` (section 2 below).
2. **Deploy user and key, on the VPS** (once):
   ```bash
   sudo adduser --disabled-password --gecos "" deploy
   sudo -u deploy mkdir -p /home/deploy/.ssh
   ssh-keygen -t ed25519 -N "" -f ~/gh_deploy_key   # generates a key pair just for GitHub
   cat ~/gh_deploy_key.pub | sudo tee -a /home/deploy/.ssh/authorized_keys
   sudo chown -R deploy:deploy /home/deploy/.ssh && sudo chmod 700 /home/deploy/.ssh && sudo chmod 600 /home/deploy/.ssh/authorized_keys
   cat ~/gh_deploy_key        # copy this private key into the VPS_SSH_KEY secret, then delete the file
   ```
3. **Server setup, on the VPS** (once). Nginx site, Let's Encrypt certificate and HTTPS redirects:
   ```bash
   git clone https://github.com/Khadim012/Myportfolio.git ~/Myportfolio
   sudo DEPLOY_USER=deploy CERT_EMAIL=m.khadim012@gmail.com bash ~/Myportfolio/deploy/server-setup.sh
   ```
4. **GitHub secrets** (repo → Settings → Secrets and variables → Actions):
   `VPS_HOST` = `VPS_IPV4`, `VPS_USER` = `deploy`, `VPS_SSH_KEY` = the private key.
   Optional: `VPS_PORT` if SSH isn't on 22, and `VPS_KNOWN_HOSTS` (output of `ssh-keyscan VPS_IPV4`) to pin the host key.
5. **Deploy:** repo → Actions → *Build and deploy* → *Run workflow* (or push to `main`). The run ends by checking that every page returns 200 and that `www` redirects.

Sections 1–6 below are the same steps done by hand.

---

## 1. Build locally

Requires Node.js 20.9+ (22 LTS recommended).

```bash
npm ci
npm run check        # eslint + TypeScript + production build
```

- **Build command:** `npm run build` (`npm run check` runs lint and typecheck first)
- **Output directory:** `out/`
- **Local preview:** `npm run preview`, then open <http://localhost:4173/>. The preview server uses the same routing rules as the Nginx config.
- **Browser tests (optional):** with the preview running, `npm run test:browser`. This needs Google Chrome; set `CHROME_PATH` if it isn't at the default location.

## 2. DNS (at your domain registrar or DNS provider)

Create or replace these records:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `VPS_IPV4` | 300 (raise to 3600 once live) |
| A | `www` | `VPS_IPV4` | 300 |

- Delete any other `A` records on `@` or `www`, such as registrar parking pages.
- If `@` or `www` has an `AAAA` (IPv6) record, it must point to this VPS's IPv6 address. Otherwise delete it: Let's Encrypt prefers IPv6 and validation will fail if it points elsewhere.
- Check propagation before requesting certificates:

```bash
dig +short khadimhussain.com A
dig +short www.khadimhussain.com A
dig +short khadimhussain.com AAAA      # should be empty, or this VPS's IPv6
```

Both A lookups must return `VPS_IPV4`.

## 3. One-time server setup

All commands run on the VPS. They only create new files for this site. Existing sites, and their `sites-available` / `sites-enabled` entries, are left alone.

```bash
# 3.1 Folders
sudo mkdir -p /var/www/khadimhussain.com/releases /var/www/letsencrypt
sudo chown -R deploy:deploy /var/www/khadimhussain.com
# Empty placeholder release so Nginx has a root before the first upload
mkdir -p /var/www/khadimhussain.com/releases/initial
echo "Coming soon" > /var/www/khadimhussain.com/releases/initial/index.html
ln -sfn /var/www/khadimhussain.com/releases/initial /var/www/khadimhussain.com/current
```

Copy the config files from this repo to the server (run on your Mac):

```bash
scp deploy/nginx/khadimhussain.com-headers.conf \
    deploy/nginx/khadimhussain.com.bootstrap.conf \
    deploy/nginx/khadimhussain.com.conf \
    deploy@VPS_IPV4:/tmp/
```

Then, on the VPS:

```bash
# 3.2 Headers snippet + temporary HTTP-only site (for certificate validation)
sudo cp /tmp/khadimhussain.com-headers.conf /etc/nginx/snippets/
sudo cp /tmp/khadimhussain.com.bootstrap.conf /etc/nginx/sites-available/khadimhussain.com
sudo ln -s /etc/nginx/sites-available/khadimhussain.com /etc/nginx/sites-enabled/khadimhussain.com

# 3.3 Validate, then reload (reload keeps other sites running)
sudo nginx -t && sudo systemctl reload nginx

# Sanity check over HTTP
curl -I http://khadimhussain.com/
```

> If your server has no `sites-available` / `sites-enabled` folders (common on CentOS or Alma), put the file in `/etc/nginx/conf.d/khadimhussain.com.conf` instead, and the snippet in `/etc/nginx/snippets/` (create the folder) or update the `include` path.
>
> If the VPS has no IPv6, remove the `listen [::]:…` lines from both config files. Otherwise `nginx -t` fails with “Address family not supported”.

## 4. HTTPS with Let's Encrypt

```bash
# 4.1 Install certbot if needed (Ubuntu/Debian)
sudo apt update && sudo apt install -y certbot

# 4.2 Issue one certificate for both names, using the webroot
#     (does not modify any Nginx config)
sudo certbot certonly --webroot -w /var/www/letsencrypt \
  -d khadimhussain.com -d www.khadimhussain.com \
  --email m.khadim012@gmail.com --agree-tos --no-eff-email \
  --deploy-hook "systemctl reload nginx"

# 4.3 Switch to the final config: HTTPS, www → apex 301, HTTP → HTTPS 301
sudo cp /tmp/khadimhussain.com.conf /etc/nginx/sites-available/khadimhussain.com
sudo nginx -t && sudo systemctl reload nginx

# 4.4 Confirm automatic renewal works
sudo certbot renew --dry-run
```

The certificate lands in `/etc/letsencrypt/live/khadimhussain.com/`, the path the final config expects. Certbot's systemd timer renews it, and the deploy hook reloads Nginx after each renewal.

Redirects in the final config (all `301 Moved Permanently`):

| Request | Goes to |
| --- | --- |
| `http://khadimhussain.com/*` | `https://khadimhussain.com/*` |
| `http://www.khadimhussain.com/*` | `https://khadimhussain.com/*` |
| `https://www.khadimhussain.com/*` | `https://khadimhussain.com/*` |
| `https://khadimhussain.com/projects/zushh` | `https://khadimhussain.com/projects/zushh/` |

## 5. Upload the site

**Option A, scripted (recommended).** Run from the project root on your Mac:

```bash
chmod +x deploy/deploy.sh
SSH_TARGET=deploy@VPS_IPV4 ./deploy/deploy.sh
```

The script builds, uploads to `releases/<timestamp>/`, switches the `current` symlink in one step, and keeps the last 5 releases.

**Option B, manual:**

```bash
npm ci && npm run check
REL=$(date +%Y%m%d%H%M%S)
ssh deploy@VPS_IPV4 "mkdir -p /var/www/khadimhussain.com/releases/$REL"
rsync -az --delete out/ deploy@VPS_IPV4:/var/www/khadimhussain.com/releases/$REL/
ssh deploy@VPS_IPV4 "ln -sfn /var/www/khadimhussain.com/releases/$REL /var/www/khadimhussain.com/current"
```

**Roll back** by pointing `current` at an earlier release:

```bash
ssh deploy@VPS_IPV4 'ls -1t /var/www/khadimhussain.com/releases'
ssh deploy@VPS_IPV4 'ln -sfn /var/www/khadimhussain.com/releases/<older> /var/www/khadimhussain.com/current'
```

No Nginx reload is needed for uploads or rollbacks.

## 6. Verify the live site

```bash
# Config is valid
sudo nginx -t

# Redirects: expect 301 with Location https://khadimhussain.com/...
curl -sI http://khadimhussain.com/            | grep -iE '^(HTTP|location)'
curl -sI http://www.khadimhussain.com/        | grep -iE '^(HTTP|location)'
curl -sI https://www.khadimhussain.com/projects/ | grep -iE '^(HTTP|location)'

# Pages: expect HTTP/2 200 for every URL
for p in / /projects/ /projects/life-pharmacy/ /projects/zushh/ \
         /projects/nordic-home-healthcare/ /projects/ziro/ /projects/cloudgate/ \
         /sitemap.xml /robots.txt /og.png; do
  printf '%s  %s\n' "$(curl -s -o /dev/null -w '%{http_code}' https://khadimhussain.com$p)" "$p"
done

# Unknown path: expect 404 and the custom page
curl -s -o /dev/null -w '%{http_code}\n' https://khadimhussain.com/nope/

# Security + cache headers
curl -sI https://khadimhussain.com/ | grep -iE 'strict-transport|content-security|x-content-type|cache-control'

# Certificate covers both names and shows its expiry date
echo | openssl s_client -connect khadimhussain.com:443 -servername khadimhussain.com 2>/dev/null \
  | openssl x509 -noout -subject -ext subjectAltName -enddate
```

Then open <https://khadimhussain.com/> in Chrome, refresh a case-study page directly, and paste the homepage URL into LinkedIn's Post Inspector (<https://www.linkedin.com/post-inspector/>) to check the social preview.

## Notes

- **Existing sites:** this config matches only `khadimhussain.com` and `www.khadimhussain.com`. It does not set `default_server`, so other sites keep their behaviour.
- **nginx version:** the config uses `listen 443 ssl http2;`, which works on nginx 1.18–1.24 and still works (with a deprecation warning) on 1.25.1+. On 1.25.1+ you may switch to `listen 443 ssl;` plus `http2 on;`.
- **HSTS** is set to one year without `includeSubDomains`, so it can't break other subdomains.
- **Search Console:** after launch, add `https://khadimhussain.com` as a property and submit `https://khadimhussain.com/sitemap.xml`.
- **If you later need a Node.js runtime** (for example a server-side contact form), run `next start` under systemd or pm2 on `127.0.0.1:3000`, and replace the `location /` block with `proxy_pass http://127.0.0.1:3000;` plus the standard `proxy_set_header Host/X-Forwarded-*` lines. The current site does not need this.
