import { Page } from '@playwright/test';

/**
 * Locates the first tree node in the tree.
 *
 * @param page The Playwright page object.
 *
 * @returns A locator for the first tree node.
 */
export function locateFirstTreeNode(page: Page) {
  return page.locator('mat-tree-node').first();
}
