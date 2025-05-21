import { Locator, Page } from '@playwright/test';

export function locateOptions(page: Page): Locator {
  return page.locator('select option');
}
