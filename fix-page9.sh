#!/bin/bash
sed -i '' 's/import { Faq } from "@\/components\/home\/faq"/import { Faq } from "@\/components\/home\/faq"\nimport { ExpansionNotify } from "@\/components\/home\/expansion-notify"/' src/app/page.tsx
sed -i '' 's/<Faq \/>/<Faq \/>\n      <ExpansionNotify \/>/' src/app/page.tsx
