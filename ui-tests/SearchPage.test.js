import { test, expect } from '@playwright/test';

test.describe('SearchPage', () => {
  test('should render search form and results', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Check if the search form is rendered
    await expect(page.locator('input[data-testid="search-q-input"]')).toBeVisible();

    // Simulate search
    await page.fill('input[data-testid="search-q-input"]', 'Apollo');
    await page.click('[data-testid="search-btn"]');

    await page.waitForTimeout(10000);

    // Wait for results to be rendered
    const nrOfPosts = await page.locator('[data-testid="result-image-card"]').count();
    expect(nrOfPosts).toBeGreaterThan(1);
  });
});