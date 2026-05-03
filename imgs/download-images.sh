#!/usr/bin/env bash
# Downloads the photo assets used by index.html into this folder.
# Run from the project root: bash imgs/download-images.sh
set -euo pipefail

cd "$(dirname "$0")"

echo "Downloading hero & section photos..."

curl -fsSL -o hero-1.jpg       "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80"
curl -fsSL -o hero-2.jpg       "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=80"
curl -fsSL -o hero-3.jpg       "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1920&q=80"
curl -fsSL -o about-jafza.jpg  "https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop"
curl -fsSL -o quote-bg.jpg     "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=60"

echo "Done. Files in $(pwd):"
ls -lh *.jpg
