#!/bin/bash
sed -i '' "s/tagline: 'Test Tagline',/tagline: 'Test Tagline',\n    description: 'Test Description',/" src/features/hours/state.test.ts
