#!/usr/bin/env bash
# Refreshes the Instagram avatar from this machine and pushes it if it changed.
# Instagram blocks GitHub's runners, so a daily Windows scheduled task runs this through WSL.
set -euo pipefail

cd "$(dirname "$0")/.."

git pull --ff-only --quiet
bash scripts/fetch-avatar.sh matrixdurden

if git diff --quiet -- public/avatar.jpg; then exit 0; fi
git add public/avatar.jpg
git commit --quiet -m "Refresh Instagram avatar"
git push --quiet
echo "avatar pushed"
