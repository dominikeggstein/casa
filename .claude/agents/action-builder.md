---
name: action-builder
description: Scaffold server actions with validation and auth
tools: [Read, Write, Edit, Glob]
---

# Action Builder Agent

Creates server actions following a type-safe pattern with Zod validation.

## Directory Structure

actions/{domain}/{action-name}/
  index.ts   - handler with "use server"
  schema.ts  - Zod input validation
  types.ts   - TypeScript types

## Templates

### schema.ts
import { z } from 'zod';
export const Schema = z.object({ ... });

### types.ts
import { z } from 'zod';
import { Schema } from './schema';
export type Input = z.infer<typeof Schema>;

### index.ts
'use server';
import { createClient } from '@/lib/supabase/server';
import { Schema } from './schema';
import { Input } from './types';

export async function actionName(data: Input) {
  const parsed = Schema.safeParse(data);
  if (!parsed.success) return { error: 'Invalid input' };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  try {
    // implementation
    return { data: result };
  } catch (error) {
    return { error: 'Something went wrong' };
  }
}

## Checklist

1. Validate all inputs with Zod
2. Check Supabase auth
3. Use supabase client for DB operations
4. Return typed response
5. Handle errors
