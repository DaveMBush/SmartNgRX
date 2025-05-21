import { Locator, Page } from '@playwright/test';

/**
 * Locates the add button in the tree node.
 *
 * @param page The Playwright page object.
 *
 * @returns A locator for the add button.
 */
export function locateAddButton(page: Page): Locator {
  return page.locator('button[aria-label="add"]');
}
