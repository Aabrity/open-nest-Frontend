import { test, expect, chromium } from '@playwright/test';

test('Header renders in the home page ', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
// Check if the logo is visible
const header = await page.locator('h1 >> span:has-text("OPEN")');
await expect(header).toBeVisible();

});

test('Toggle theme between light and dark', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Get the current theme
  const body = await page.locator('body');
  let initialTheme = await body.getAttribute('class');
  
  // Click on the theme toggle button
  const themeToggleButton = await page.locator('button[type="button"]');
  await themeToggleButton.click();
  
  // Assert that the theme class has changed
  let newTheme = await body.getAttribute('class');
  expect(initialTheme).not.toBe(newTheme);
});




test('Check the main heading and various sections', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:5173/'); // Replace with your actual URL

  // Check for the main heading (search for text "Perfect" within <span> element)
  await expect(page.locator('h1 span:has-text("Perfect")')).toBeVisible();

});




test('Navigation to search page', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:5173');

  const getStartedLink = page.locator('a', { hasText: "Let's get started..." });
  await getStartedLink.click();

  await expect(page).toHaveURL(/.*\/search/); // Check if the URL contains /search
  await browser.close();
});