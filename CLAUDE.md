# Casa

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Auth**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **UI**: shadcn/ui + Radix primitives + Tailwind CSS
- **Validation**: Zod

## Project Structure

```
app/
  (marketing)/     # Public pages
  (platform)/      # Authenticated app routes
  api/             # API routes (webhooks, etc.)
actions/           # Server Actions - each in folder with index.ts, schema.ts, types.ts
lib/
  supabase/
    server.ts      # Server-side Supabase client
    client.ts      # Browser-side Supabase client
hooks/             # React hooks
components/
  ui/              # shadcn/ui components
  providers/       # Context providers
supabase/
  migrations/      # Database migrations
```

## Component Reuse (Critical)

**Before creating any new UI component:**

1. Search `components/` for existing similar components
2. Check if an existing component can be made reusable with props
3. Look at related features for patterns

**Never duplicate UI patterns** - extract to shared component instead.

## Pre-Commit

Run `npx tsc --noEmit` before every commit. Do not commit if it fails.

## Essential Commands

```bash
# Development
npm run dev

# Supabase
npx supabase start           # Start local Supabase
npx supabase db push          # Push migrations
npx supabase gen types        # Generate TypeScript types
npx supabase migration new    # Create new migration

# Build
npm run build
npm run lint
```

## Environment Variables

Required in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server-only)

## Prompting Tips

- **Bug fix**: paste raw CI output/logs/errors, say "fix"
- **Review**: "Grill me on these changes, don't PR until I pass"
- **Proof**: "Prove this works - compare main vs branch"
- **Reset**: "Knowing everything you know now, scrap this and do the elegant solution"
- **Heavy search/logs**: append "use subagents" to keep main context clean

## Common Mistakes

<!-- Append here after every correction so future sessions don't repeat them. -->
