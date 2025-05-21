import { Page } from '@playwright/test';

export function locate2ndTreeNode(page: Page) {
  return page.locator('mat-tree-node').nth(1);
}
