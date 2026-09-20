#!/bin/bash
sed -i '' 's/import { WhyCoconut } from "@\/components\/home\/why-coconut"/import { WhyCoconut } from "@\/components\/home\/why-coconut"\nimport { MomentPickerTeaser } from "@\/components\/home\/moment-picker-teaser"/' src/app/page.tsx
sed -i '' 's/<WhyCoconut \/>/<WhyCoconut \/>\n      <MomentPickerTeaser \/>/' src/app/page.tsx
