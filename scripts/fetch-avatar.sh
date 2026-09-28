#!/usr/bin/env bash
# Downloads the current Instagram profile photo to public/avatar.jpg.
# Instagram only serves the og:image to link-preview bots, and only at 100x100.
# Leaves the existing file alone if anything fails.
set -euo pipefail

USER_NAME="${1:-matrixdurden}"
OUT="$(dirname "$0")/../public/avatar.jpg"
TMP="$(mktemp)"
trap 'rm -f "$TMP" "$TMP.jpg"' EXIT

curl -fsSL --max-time 20 -A "facebookexternalhit/1.1" "https://www.instagram.com/${USER_NAME}/" -o "$TMP"

URL="$(grep -oE 'property="og:image" content="[^"]+"' "$TMP" | head -1 | sed -e 's/.*content="//' -e 's/"$//' -e 's/&amp;/\&/g')"
if [ -z "$URL" ]; then
  echo "og:image not found, keeping existing avatar" >&2
  exit 0
fi

curl -fsSL --max-time 20 "$URL" -o "$TMP.jpg"
if ! head -c 3 "$TMP.jpg" | od -An -tx1 | grep -q 'ff d8 ff'; then
  echo "download is not a JPEG, keeping existing avatar" >&2
  exit 0
fi

if cmp -s "$TMP.jpg" "$OUT"; then
  echo "avatar unchanged"
else
  cp "$TMP.jpg" "$OUT"
  echo "avatar updated"
fi
