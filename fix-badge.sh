#!/bin/bash
sed -i '' 's/<Badge variant="primary">Primary Badge<\/Badge>/<Badge variant="info">Info Badge<\/Badge>/' src/app/style-guide/client-page.tsx
sed -i '' 's/<Badge variant="secondary">Secondary Badge<\/Badge>/<Badge variant="completed">Completed Badge<\/Badge>/' src/app/style-guide/client-page.tsx
