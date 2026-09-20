#!/usr/bin/env bash
# Moves the pack's assets into their final repo locations (dev plan task T0.1).
#   assets/{brand,scenes,products,posters}, asset-manifest.json -> public/assets/
#   assets/reference/*                                          -> design-reference/
#   assets/source-originals/                                    -> design-reference/source-originals/
# Idempotent: safe to run twice.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -d assets ]; then
  if [ -d public/assets ]; then echo "✔ assets already placed (public/assets exists)"; exit 0; fi
  echo "✘ no assets/ folder found — is this the pack root?" >&2; exit 1
fi

mkdir -p public/assets design-reference
for d in brand scenes products posters; do
  if [ -d "assets/$d" ]; then mkdir -p "public/assets/$d"; cp -R "assets/$d/." "public/assets/$d/"; rm -rf "assets/$d"; fi
done
[ -f assets/asset-manifest.json ] && mv assets/asset-manifest.json public/assets/asset-manifest.json
if [ -d assets/reference ]; then cp -R assets/reference/. design-reference/; rm -rf assets/reference; fi
if [ -d assets/source-originals ]; then mkdir -p design-reference/source-originals; cp -R assets/source-originals/. design-reference/source-originals/; rm -rf assets/source-originals; fi
rmdir assets 2>/dev/null || echo "note: assets/ still has files, left in place"

echo "✔ assets placed:"
echo "   public/assets/        (served)"
echo "   design-reference/     (NOT served)"
