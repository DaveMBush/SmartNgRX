import { Locator, Page } from '@playwright/test';

/**
 * Locates the add menu item in the tree node.
 *
 * @param page The Playwright page object.
 * @param label The label of the add menu item.
 *
 * @returns A locator for the add menu item.
 */
export async function locateAddMenuItem(
  page: Page,
  label: string,
): Promise<Locator> {
  const locator = page.locator(`button.mat-mdc-menu-item[aria-label="${label}"]`);
  await locator.waitFor({ state: 'visible' });
  return locator;
}
