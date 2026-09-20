#!/bin/bash
sed -i '' "s/Bringing nature's finest/Bringing nature\\&apos;s finest/" src/components/home/hero.tsx
sed -i '' "s/other components' aesthetic/other components\\&#39; aesthetic/" src/app/style-guide/page.tsx
