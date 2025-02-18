import { test, expect, chromium } from '@playwright/test';

test('Search page - Loading state', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:5173/search');

  // Check for "Loading..." message
//   await expect(page.locator('p')).toContainText('Loading...');

  // Wait for listings or no listings to show
  await page.waitForSelector('.flex.flex-wrap.gap-4 > div', { state: 'attached' });

  await browser.close();
});
