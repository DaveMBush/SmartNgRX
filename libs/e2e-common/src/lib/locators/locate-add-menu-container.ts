import { Page } from "@playwright/test";

export function locateAddMenuContainer(page: Page): Promise<void> {
  return page.locator('.mat-mdc-menu-panel').waitFor({ state: 'visible' });
}
