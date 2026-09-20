#!/bin/bash
sed -i '' "s/Bringing nature's finest/Bringing nature\\&apos;s finest/" src/app/opengraph-image.tsx
sed -i '' 's/outlet => ({/(_outlet) => ({/' src/components/seo/json-ld.tsx
