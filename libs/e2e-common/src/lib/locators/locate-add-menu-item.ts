import { Locator, Page } from '@playwright/test';

export async function locateAddMenuItem(
  page: Page,
  label: string,
): Promise<Locator> {
  var locator = page.locator(`button.mat-mdc-menu-item[aria-label="${label}"]`);
  await locator.waitFor({ state: 'visible' });
  return locator;
}
