import { Page } from '@playwright/test';

/**
 * Locates the home link in the navigation bar.
 *
 * @param page The Playwright page object.
 *
 * @returns A locator for the home link.
 */
export function locateHomeLink(page: Page) {
  return page.locator('a[href="/home"]').first();
}
