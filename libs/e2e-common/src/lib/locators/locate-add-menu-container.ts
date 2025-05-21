import { Page } from '@playwright/test';

/**
 * Locates the add menu container in the tree node.
 *
 * @param page The Playwright page object.
 *
 * @returns A locator for the add menu container.
 */
export async function locateAddMenuContainer(page: Page): Promise<void> {
  await page.locator('.mat-mdc-menu-panel').waitFor({ state: 'visible' });
}
