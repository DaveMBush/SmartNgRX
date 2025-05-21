import { Locator, Page } from '@playwright/test';

/**
 * Locates the options in a select element at the top of the page.
 *
 * @param page The Playwright page object.
 *
 * @returns A locator for the options in the select element.
 */
export function locateOptions(page: Page): Locator {
  return page.locator('select option');
}
