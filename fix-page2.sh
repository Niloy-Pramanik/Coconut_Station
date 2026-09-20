#!/bin/bash
sed -i '' 's/import { PickYourSize } from "@\/components\/home\/pick-your-size"/import { PickYourSize } from "@\/components\/home\/pick-your-size"\nimport { SignatureMenu } from "@\/components\/home\/signature-menu"/' src/app/page.tsx
sed -i '' 's/<PickYourSize \/>/<PickYourSize \/>\n      <SignatureMenu \/>/' src/app/page.tsx
