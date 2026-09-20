#!/bin/bash
sed -i '' 's/import { BulkEventsBand } from "@\/components\/home\/bulk-events-band"/import { BulkEventsBand } from "@\/components\/home\/bulk-events-band"\nimport { BlogTeasers } from "@\/components\/home\/blog-teasers"/' src/app/page.tsx
sed -i '' 's/<BulkEventsBand \/>/<BulkEventsBand \/>\n      <BlogTeasers \/>/' src/app/page.tsx
