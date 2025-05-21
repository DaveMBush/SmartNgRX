import { Locator  } from "@playwright/test";

/**
 * Locates the tree label in the tree node.
 *
 * @param tree The tree node that wraps the label.
 * 
 * @returns A locator for the tree label.
 */
export function locateTreeLabel(tree: Locator): Locator {
  return tree.locator('span.mdc-button__label');
}
