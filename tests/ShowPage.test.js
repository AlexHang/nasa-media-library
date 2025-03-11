import { test, expect } from '@playwright/test';

test.describe('ShowPage', () => {
  test('should render show page content', async ({ page }) => {
    await page.goto('http://localhost:5173/show/KSC-04pd1644');
    // Check if the show page content is rendered
    await expect(page.locator('h1[data-testid="title-result"]')).toBeVisible();
    await expect(page.locator('p[data-testid="description-result"]')).toBeVisible();
  });
});