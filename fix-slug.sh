#!/bin/bash
sed -i '' 's/import { notFound } from "next"/import { notFound } from "next\/navigation"/' src/app/blog/[slug]/page.tsx
sed -i '' 's/notFound()/return notFound()/' src/app/blog/[slug]/page.tsx
