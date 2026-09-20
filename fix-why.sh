#!/bin/bash
sed -i '' 's/Natural, FreshDaily, Hygienic/IconNatural, IconFreshDaily, IconHygienic/' src/components/home/why-coconut.tsx
sed -i '' 's/icon: Natural/icon: IconNatural/' src/components/home/why-coconut.tsx
sed -i '' 's/icon: FreshDaily/icon: IconFreshDaily/' src/components/home/why-coconut.tsx
sed -i '' 's/icon: Hygienic/icon: IconHygienic/' src/components/home/why-coconut.tsx
sed -i '' 's/variant="outline"/variant="secondary"/g' src/components/home/why-coconut.tsx
