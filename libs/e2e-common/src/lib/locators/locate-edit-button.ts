import { Locator, Page } from '@playwright/test';

/**
 * Locates the edit button in the tree node.
 *
 * @param page The Playwright page object.
 *
 * @returns A locator for the edit button.
 */
export function locateEditButton(page: Page): Locator {
  return page.locator('button[aria-label="edit"]');
}
