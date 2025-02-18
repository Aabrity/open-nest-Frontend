import { test, expect } from '@playwright/test';

test.describe('SignUp Page', () => {

  test.beforeEach(async ({ page }) => {
    // Go to the SignUp page before each test
    await page.goto('http://localhost:5173/sign-up');
  });

  test('renders the SignUp form correctly', async ({ page }) => {
    // Check if the SignUp form elements are present
    await expect(page.locator('input[placeholder="username"]')).toBeVisible();
    await expect(page.locator('input[placeholder="email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Sign Up")')).toBeVisible();
  });

  test('should update username, email, and password fields on user input', async ({ page }) => {
    // Type into the username, email, and password fields
    await page.fill('input[placeholder="username"]', 'abru123');
    await page.fill('input[placeholder="email"]', 'abru123@gmail.com');
    await page.fill('input[placeholder="password"]', 'password123');

    // Verify that the fields have been updated
    await expect(page.locator('input[placeholder="username"]')).toHaveValue('abru123');
    await expect(page.locator('input[placeholder="email"]')).toHaveValue('abru123@gmail.com');
    await expect(page.locator('input[placeholder="password"]')).toHaveValue('password123');
  });

  test('should show verification message on successful sign-up', async ({ page, context }) => {
    // Mock the fetch API call
    await context.route('**/api/auth/signup', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    });

    // Fill out the form and submit
    await page.fill('input[placeholder="username"]', 'abru123');
    await page.fill('input[placeholder="email"]', 'abru123@gmail.com');
    await page.fill('input[placeholder="password"]', 'password123');
    await page.click('button:has-text("Sign Up")');

    // Wait for verification message to be visible
    await expect(page.locator('text=Please check your email to verify your account')).toBeVisible();
  });

  test('should navigate to the sign-in page when clicking "Sign in" link', async ({ page }) => {
    // Click on the "Sign in" link
    await page.click('text=Sign in');

    // Verify navigation to the sign-in page
    await expect(page).toHaveURL('http://localhost:5173/sign-in');
  });

  test('should show error message on failed sign-up', async ({ page, context }) => {
    // Mock the fetch API call to return an error
    await context.route('**/api/auth/signup', (route) => {
      route.fulfill({
        status: 400,
        body: JSON.stringify({ success: false, message: 'Email already taken' }),
      });
    });

    // Fill out the form and submit
    await page.fill('input[placeholder="username"]', 'abru123');
    await page.fill('input[placeholder="email"]', 'abru123@gmail.com');
    await page.fill('input[placeholder="password"]', 'password123');
    await page.click('button:has-text("Sign Up")');

    // Wait for error message to be visible
    await expect(page.locator('text=Email already taken')).toBeVisible();
  });
});
