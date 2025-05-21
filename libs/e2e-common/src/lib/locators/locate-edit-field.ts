import { Locator, Page } from "@playwright/test";

export function locateEditField(page: Page): Locator {
  return page.locator('dmb-node-editor input');
}
