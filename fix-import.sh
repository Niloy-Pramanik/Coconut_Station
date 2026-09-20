#!/bin/bash
sed -i '' 's/import { useStoreHours } from "@\/features\/hours\/state"/import { useStoreHours } from "@\/features\/hours\/use-store-hours"/' src/components/home/outlet-spotlight.tsx
