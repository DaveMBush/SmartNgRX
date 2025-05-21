import { Locator, Page } from '@playwright/test';

export function locateAddButton(page: Page): Locator {
  return page.locator('button[aria-label="add"]');
}
