#!/usr/bin/env bash
# Upload a new release of khadimhussain.com and switch to it atomically.
# Run from the project root on your Mac AFTER the one-time server setup in DEPLOY.md.
#
#   SSH_TARGET=deploy@203.0.113.10 ./deploy/deploy.sh
#
# Each release goes to /var/www/khadimhussain.com/releases/<timestamp>/ and
# /var/www/khadimhussain.com/current is re-pointed to it. Nginx serves
# "current", so there is no partial-upload window. The last 5 releases are kept.
set -euo pipefail

: "${SSH_TARGET:?Set SSH_TARGET, e.g. SSH_TARGET=deploy@YOUR_VPS_IPV4}"
SITE_DIR="/var/www/khadimhussain.com"
RELEASE="$(date +%Y%m%d%H%M%S)"

echo "→ Checking and building"
npm ci
npm run check          # lint + typecheck + static build into ./out

test -f out/index.html || { echo "out/index.html missing — build failed"; exit 1; }

echo "→ Uploading release $RELEASE"
ssh "$SSH_TARGET" "mkdir -p $SITE_DIR/releases/$RELEASE"
rsync -az --delete out/ "$SSH_TARGET:$SITE_DIR/releases/$RELEASE/"

echo "→ Switching current -> $RELEASE"
ssh "$SSH_TARGET" "ln -sfn $SITE_DIR/releases/$RELEASE $SITE_DIR/current.tmp && mv -Tf $SITE_DIR/current.tmp $SITE_DIR/current"

echo "→ Pruning old releases (keeping 5)"
ssh "$SSH_TARGET" "cd $SITE_DIR/releases && ls -1t | tail -n +6 | xargs -r rm -rf --"

echo "✓ Deployed $RELEASE. Verify with the commands in DEPLOY.md (section 6)."
