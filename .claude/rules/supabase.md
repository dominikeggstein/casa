# Supabase Rules

## Client

Use the appropriate Supabase client for the context:
- Server Components / Server Actions: createClient() from @/lib/supabase/server
- Client Components: createBrowserClient() from @/lib/supabase/client
- Middleware: createServerClient() from @supabase/ssr

Never create raw Supabase clients directly - always use the project helpers.

## Auth

1. Server-side auth check: supabase.auth.getUser() (not getSession - getUser is verified)
2. Middleware protects routes via middleware.ts
3. Never trust session data alone for authorization - always verify with getUser()

## Queries

1. Use select to limit returned fields
2. Always handle null/error cases from queries
3. Use RLS (Row Level Security) policies as the primary access control
4. Use transactions via rpc() for multi-step operations

## Environment Variables

- NEXT_PUBLIC_SUPABASE_URL - Public Supabase URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY - Public anon key
- SUPABASE_SERVICE_ROLE_KEY - Server-only service role key (never expose to client)
