# No Console Rules

## Forbidden in Production

- console.log
- console.warn
- console.error
- console.debug

## Alternatives

- API routes: Use structured error responses
- Components: Use toast notifications (sonner)
- Development only: Remove before committing

## Exceptions

- scripts/ folder for local tooling
- Temporary debugging (must remove before PR)
