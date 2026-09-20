#!/bin/bash
sed -i '' 's/import { BlogTeasers } from "@\/components\/home\/blog-teasers"/import { BlogTeasers } from "@\/components\/home\/blog-teasers"\nimport { Faq } from "@\/components\/home\/faq"/' src/app/page.tsx
sed -i '' 's/<BlogTeasers \/>/<BlogTeasers \/>\n      <Faq \/>/' src/app/page.tsx
