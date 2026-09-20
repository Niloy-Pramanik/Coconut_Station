#!/bin/bash
sed -i '' 's/size="sm"/size="md"/g' src/components/home/hero-hotspots.tsx
sed -i '' 's/variant="outline"/variant="secondary"/g' src/app/style-guide/page.tsx
sed -i '' 's/<Chip selected>/<Chip active>/g' src/app/style-guide/page.tsx
sed -i '' 's/formatValue={(v) => `৳${v} \/ ৳100`}//g' src/app/style-guide/page.tsx
