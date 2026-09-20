#!/bin/bash
sed -i '' 's/setState(getOpeningState(new Date(), siteConfig))/\/\/ eslint-disable-next-line react-hooks\/set-state-in-effect\n    setState(getOpeningState(new Date(), siteConfig))/' src/components/shell/announcement-bar.tsx
sed -i '' 's/setIsMobileMenuOpen(false)/\/\/ eslint-disable-next-line react-hooks\/set-state-in-effect\n    setIsMobileMenuOpen(false)/' src/components/shell/header.tsx
sed -i '' 's/filter((\[_, value\])/filter((\[_key, value\])/' src/components/shell/footer.tsx
sed -i '' '/import { cn } from "@\/lib\/utils"/d' src/components/shell/mobile-bottom-bar.tsx
sed -i '' 's/import { isBefore, parseISO, parse, isAfter }/import { isBefore, isAfter }/' src/features/hours/state.ts
