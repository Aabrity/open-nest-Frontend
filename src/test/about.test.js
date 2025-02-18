


import { test, expect } from '@playwright/test';

test('About page title is correct', async ({ page }) => {
  await page.goto('http://localhost:5173/about');

  const title = page.locator('h1', { hasText: 'About Open Nest Real Estate' }); // More specific locator
  await expect(title).toBeVisible();
});

test('About page content is present', async ({ page }) => {
  await page.goto('http://localhost:5173/about');

  const paragraphs = page.locator('p');

  // More robust checks using regular expressions and checking visibility first
  await expect(paragraphs.nth(0)).toBeVisible();
  await expect(paragraphs.nth(0)).toHaveText(/Open Nest is a trusted real estate platform/);

  await expect(paragraphs.nth(1)).toBeVisible();
  await expect(paragraphs.nth(1)).toHaveText(/Our mission is to make the real estate process straightforward/);

  await expect(paragraphs.nth(2)).toBeVisible();
  await expect(paragraphs.nth(2)).toHaveText(/With an in-depth understanding of the local market/);

  await expect(paragraphs.nth(3)).toBeVisible();
  await expect(paragraphs.nth(3)).toHaveText(/Our team of experts is committed to helping you achieve your real estate goals/);
});
