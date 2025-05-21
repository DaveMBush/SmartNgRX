import { Page } from "@playwright/test";

export function locateFirstTreeNode(page: Page) {
  return page.locator('mat-tree-node').first();
}
