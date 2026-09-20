#!/bin/bash
sed -i '' 's/import { MomentPickerTeaser } from "@\/components\/home\/moment-picker-teaser"/import { MomentPickerTeaser } from "@\/components\/home\/moment-picker-teaser"\nimport { OutletSpotlight } from "@\/components\/home\/outlet-spotlight"/' src/app/page.tsx
sed -i '' 's/<MomentPickerTeaser \/>/<MomentPickerTeaser \/>\n      <OutletSpotlight \/>/' src/app/page.tsx
