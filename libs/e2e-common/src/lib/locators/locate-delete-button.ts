import { Locator, Page } from '@playwright/test';

/**
 * Locates the delete button in the tree node.
 *
 * @param page The Playwright page object.
 *
 * @returns A locator for the delete button.
 */
export function locateDeleteButton(page: Page): Locator {
  return page.locator('button[aria-label="delete"]');
}
