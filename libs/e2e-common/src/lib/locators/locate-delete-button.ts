import { Locator, Page } from '@playwright/test';

export function locateDeleteButton(page: Page): Locator {
  return page.locator('button[aria-label="delete"]');
}
