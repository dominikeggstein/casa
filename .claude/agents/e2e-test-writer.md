---
name: e2e-test-writer
description: Write Playwright E2E tests for routes
tools: [Read, Write, Edit, Glob, Grep, Bash]
---

# E2E Test Writer Agent

Creates Playwright tests for application routes.

## Config

- Tests in: tests/
- Config: playwright.config.ts
- Browser: Chromium
- Screenshots on failure

## Test Structure

import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/route');
    await expect(page.locator('selector')).toBeVisible();
  });
});

## Auth Handling

For protected routes, set up Supabase auth state or use test user.

## Common Patterns

- page.goto() for navigation
- page.click() for interactions
- page.fill() for form inputs
- expect().toBeVisible() for assertions
- page.waitForResponse() for API calls

## Run Tests

npx playwright test
npx playwright test --ui
npx playwright show-report
