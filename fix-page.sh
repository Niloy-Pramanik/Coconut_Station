#!/bin/bash
sed -i '' 's/import { Hero } from "@\/components\/home\/hero"/import { Hero } from "@\/components\/home\/hero"\nimport { PickYourSize } from "@\/components\/home\/pick-your-size"/' src/app/page.tsx
sed -i '' 's/<Hero \/>/<Hero \/>\n      <PickYourSize \/>/' src/app/page.tsx
