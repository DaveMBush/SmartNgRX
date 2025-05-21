import { Locator, Page } from '@playwright/test';

export function locateEditButton(page: Page): Locator {
  return page.locator('button[aria-label="edit"]');
}
