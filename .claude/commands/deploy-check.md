---
description: Pre-deployment checks - lint, typecheck, and build
---

# Pre-Deployment Checks

## Execute All Checks

npm run lint && npx tsc --noEmit && npm run build

## Individual Checks

npm run lint           # Lint
npx tsc --noEmit       # TypeScript check
npm run build          # Production build

## Fix Common Issues

- Lint errors: npm run lint -- --fix
- Type errors: Check imports, missing types
- Build errors: Run /db-sync first
