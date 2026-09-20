#!/bin/bash
sed -i '' 's/import { SignatureMenu } from "@\/components\/home\/signature-menu"/import { SignatureMenu } from "@\/components\/home\/signature-menu"\nimport { WhyCoconut } from "@\/components\/home\/why-coconut"/' src/app/page.tsx
sed -i '' 's/<SignatureMenu \/>/<SignatureMenu \/>\n      <WhyCoconut \/>/' src/app/page.tsx
