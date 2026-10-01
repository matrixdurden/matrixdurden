#!/usr/bin/env bash
# Downloads the current Instagram profile photo to public/avatar.jpg.
# Instagram only serves the og:image to link-preview bots, and only at 100x100.
# Leaves the existing file alone if anything fails.
# Instagram often blocks GitHub's runners, so scripts/update-avatar.sh also runs this from home.
set -euo pipefail

# On GitHub Actions, show problems as warnings in the run summary instead of hiding them.
WARN="${GITHUB_ACTIONS:+::warning::}"

USER_NAME="${1:-matrixdurden}"
OUT="$(dirname "$0")/../public/avatar.jpg"
TMP="$(mktemp)"
trap 'rm -f "$TMP" "$TMP.jpg"' EXIT

curl -fsSL --max-time 20 -A "facebookexternalhit/1.1" "https://www.instagram.com/${USER_NAME}/" -o "$TMP"

URL="$(grep -oE 'property="og:image" content="[^"]+"' "$TMP" | head -1 | sed -e 's/.*content="//' -e 's/"$//' -e 's/&amp;/\&/g')"
if [ -z "$URL" ]; then
  echo "${WARN}og:image not found (Instagram probably served a login page), keeping existing avatar" >&2
  exit 0
fi

curl -fsSL --max-time 20 "$URL" -o "$TMP.jpg"
if ! head -c 3 "$TMP.jpg" | od -An -tx1 | grep -q 'ff d8 ff'; then
  echo "${WARN}download is not a JPEG, keeping existing avatar" >&2
  exit 0
fi

if cmp -s "$TMP.jpg" "$OUT"; then
  echo "avatar unchanged"
else
  cp "$TMP.jpg" "$OUT"
  echo "avatar updated"
fi
