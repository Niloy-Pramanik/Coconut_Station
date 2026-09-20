#!/bin/bash
sed -i '' 's/Natural, FreshDaily, Hygienic, Premium, SmartCut, DigitalPayment, HomeDelivery/IconNatural, IconFreshDaily, IconHygienic, IconPremium, IconSmartCut, IconDigitalPayment, IconHomeDelivery/' src/components/home/trust-strip.tsx
sed -i '' 's/icon: Natural/icon: IconNatural/' src/components/home/trust-strip.tsx
sed -i '' 's/icon: FreshDaily/icon: IconFreshDaily/' src/components/home/trust-strip.tsx
sed -i '' 's/icon: Hygienic/icon: IconHygienic/' src/components/home/trust-strip.tsx
sed -i '' 's/icon: Premium/icon: IconPremium/' src/components/home/trust-strip.tsx
sed -i '' 's/icon: SmartCut/icon: IconSmartCut/' src/components/home/trust-strip.tsx
sed -i '' 's/icon: DigitalPayment/icon: IconDigitalPayment/' src/components/home/trust-strip.tsx
sed -i '' 's/icon: HomeDelivery/icon: IconHomeDelivery/' src/components/home/trust-strip.tsx

sed -i '' 's/Sprig/IconSprig/g' src/components/home/hero.tsx
sed -i '' 's/variant="outline"/variant="secondary"/g' src/components/home/hero.tsx
sed -i '' 's/const EASE_OUT_SOFT = \[0.22, 1, 0.36, 1\]/const EASE_OUT_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1]/' src/components/home/hero.tsx
sed -i '' 's/...mobileRest//g' src/components/home/hero.tsx

