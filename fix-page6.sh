#!/bin/bash
sed -i '' 's/import { OutletSpotlight } from "@\/components\/home\/outlet-spotlight"/import { OutletSpotlight } from "@\/components\/home\/outlet-spotlight"\nimport { BulkEventsBand } from "@\/components\/home\/bulk-events-band"/' src/app/page.tsx
sed -i '' 's/<OutletSpotlight \/>/<OutletSpotlight \/>\n      <BulkEventsBand \/>/' src/app/page.tsx
