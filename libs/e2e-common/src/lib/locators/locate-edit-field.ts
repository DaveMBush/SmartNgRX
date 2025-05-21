import { Locator, Page } from "@playwright/test";

/**
 * Locates the edit field in the node editor.
 *
 * @param page The Playwright page object.
 *
 * @returns A locator for the edit field.
 */
export function locateEditField(page: Page): Locator {
  return page.locator('dmb-node-editor input');
}
