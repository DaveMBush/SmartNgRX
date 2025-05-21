import { Page } from '@playwright/test';

/**
 * Locates the second tree node in the tree.
 * Used to find a sub node in a tree.
 *
 * @param page The Playwright page object.
 *
 * @returns A locator for the second tree node.
 */
export function locate2ndTreeNode(page: Page) {
  return page.locator('mat-tree-node').nth(1);
}
