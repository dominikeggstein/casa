# Safe Actions Rules

## Structure

All server actions must follow: actions/{domain}/{action-name}/
- index.ts - handler with "use server" directive
- schema.ts - Zod input validation schema
- types.ts - TypeScript types

## Requirements

1. Always validate inputs with Zod schemas
2. Check auth with Supabase: const { data: { user } } = await supabase.auth.getUser()
3. Return { error: string } or { data: T }
4. Use Supabase client for database access
5. Handle errors with try/catch, never expose internal errors

## Pattern

const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
if (!user) return { error: 'Unauthorized' };
// ... implementation
