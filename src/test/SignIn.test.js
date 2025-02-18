import { test, expect } from '@playwright/test';

test.describe('SignIn Page', () => {

  test.beforeEach(async ({ page }) => {
    // Go to the SignIn page before each test
    await page.goto('http://localhost:5173/sign-in');
  });

  test('renders the SignIn form correctly', async ({ page }) => {
    // Check if the SignIn form elements are present
    await expect(page.locator('input[placeholder="email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
  });

  test('should update email and password fields on user input', async ({ page }) => {
    // Type into the email and password fields
    await page.fill('input[placeholder="email"]', 'abru@gmail.com');
    await page.fill('input[placeholder="password"]', '1234567890');

    // Verify that the email and password fields have been updated
    await expect(page.locator('input[placeholder="email"]')).toHaveValue('abru@gmail.com');
    await expect(page.locator('input[placeholder="password"]')).toHaveValue('1234567890');
  });

  test('should call API on form submission and handle success', async ({ page, context }) => {
    // Mock the fetch API call
    await context.route('**/api/auth/signin', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true, user: { id: '123', name: 'Test User' } }),
      });
    });

    // Fill out the form and submit
    await page.fill('input[placeholder="email"]', 'abru@gmail.com');
    await page.fill('input[placeholder="password"]', '1234567890');
    await page.click('button:has-text("Sign In")');

    // Wait for navigation to the home page after successful sign-in
    await expect(page).toHaveURL('http://localhost:5173/');
  });


  test('should navigate to the sign-up page when clicking "Sign up" link', async ({ page }) => {
    // Click on the "Sign up" link
    await page.click('text=Sign up');

    // Verify navigation to the sign-up page
    await expect(page).toHaveURL('http://localhost:5173/sign-up');
  });
});


