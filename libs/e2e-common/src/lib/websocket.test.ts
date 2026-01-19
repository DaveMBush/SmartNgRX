import { expect, Page, test } from '@playwright/test';

import { loadRoute } from './load-route';
import { locateAddButton } from './locators/locate-add-button';
import { locateAddMenuContainer } from './locators/locate-add-menu-container';
import { locateAddMenuItem } from './locators/locate-add-menu-item';
import { locateEditButton } from './locators/locate-edit-button';
import { locateEditField } from './locators/locate-edit-field';
import { locateFirstTreeNode } from './locators/locate-first-tree-node';
import { locateTreeLabel } from './locators/locate-tree-label';

/**
 * Tests for websocket functionality.
 *
 * @returns {void}
 */
export function websocketTests(): void {
  ['/tree', '/treeNoRefresh', '/treeNoRemove', '/treeNoDirty'].forEach(
    (route) => {
      test.describe('websockets', () => {
        let secondPage: Page;

        test.beforeEach(async ({ page, context }) => {
          await loadRoute(page, route);
          secondPage = await context.newPage();
          await loadRoute(secondPage, route);
        });

        test.describe(`Edit (${route})`, () => {
          test.describe('when I update the label of a node in page 1', () => {
            let inputValue = '';

            test.beforeEach(async ({ page }) => {
              await locateFirstTreeNode(page).hover();
              await locateEditButton(page).filter({ visible: true }).click();
              const inputLocator = locateEditField(page);
              inputValue = await inputLocator.inputValue();
              await inputLocator.fill(inputValue + 'abc');
              await page.keyboard.press('Enter');
              await expect(
                locateTreeLabel(locateFirstTreeNode(page)),
              ).toHaveText(inputValue + 'abc');
              await expect(inputLocator).toBeHidden();
            });

            test('the change is reflected in page 2', async () => {
              await expect(
                locateTreeLabel(locateFirstTreeNode(secondPage)),
              ).toHaveText(inputValue + 'abc');
            });

            test.afterEach(async ({ page }) => {
              await locateFirstTreeNode(page).hover();
              await locateEditButton(page).filter({ visible: true }).click();
              const inputLocator = locateEditField(page);
              await inputLocator.fill(inputValue);
              await page.keyboard.press('Enter');
              await expect(
                locateTreeLabel(locateFirstTreeNode(page)),
              ).toHaveText(inputValue);
              await expect(inputLocator).toBeHidden();
            });
          });
        });

        test.describe(`Add/Delete (${route})`, () => {
          test.beforeEach(async ({ page }) => {
            // Add a new element but ESC out to close it.
            // This will scroll us to where the element we
            // are going to add is.
            await locateFirstTreeNode(secondPage).hover();
            await locateAddButton(secondPage).filter({ visible: true }).click();
            // wait for the menu container to be visible
            await locateAddMenuContainer(secondPage);
            await (await locateAddMenuItem(secondPage, 'Document')).click();
            await locateEditField(secondPage).waitFor({ state: 'visible' });
            // Yes, I know, "don't use waitForTimeout", but
            // this is the only way this code will work
            // eslint-disable-next-line playwright/no-wait-for-timeout -- see above
            await secondPage.waitForTimeout(200);
            await secondPage.keyboard.press('Escape');

            // now add the new element on page 1
            await locateFirstTreeNode(page).hover();
            await locateAddButton(page).filter({ visible: true }).click();
            // wait for the menu container to be visible
            await locateAddMenuContainer(page);
            await (await locateAddMenuItem(page, 'Document')).click();
            await locateEditField(page).waitFor({ state: 'visible' });
            await locateEditField(page).click();
            // eslint-disable-next-line sonarjs/no-duplicate-string -- test is ok. I want this to be explicit
            await locateEditField(page).fill('New docs abc');
            // Yes, I know, "don't use waitForTimeout", but
            // this is the only way this code will work
            // eslint-disable-next-line playwright/no-wait-for-timeout -- see above
            await page.waitForTimeout(200);
            await page.keyboard.press('Enter');
          });

          test('the new tree node should be visible on page 2', async () => {
            // wait for the new tree node to be visible
            await expect(secondPage.getByText('New docs abc')).toBeVisible();
          });

          test.afterEach(async ({ page }) => {
            // wait for the new tree node to be visible
            await expect(page.getByText('New docs abc')).toBeVisible();
            await page
              .locator('mat-tree-node')
              .filter({ hasText: 'New docs abc' })
              .locator('button[aria-label="delete"]')
              .click();
            await expect(secondPage.getByText('New docs abc')).toBeHidden();
          });
        });
      });
    },
  );
}
