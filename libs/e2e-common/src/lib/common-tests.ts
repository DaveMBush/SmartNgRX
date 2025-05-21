import { expect, test } from '@playwright/test';
import { loadRoute } from './load-route';
import { locate2ndTreeNode } from './locators/locate-2nd-tree-node';
import { locateAddButton } from './locators/locate-add-button';
import { locateAddMenuContainer } from './locators/locate-add-menu-container';
import { locateAddMenuItem } from './locators/locate-add-menu-item';
import { locateDeleteButton } from './locators/locate-delete-button';
import { locateEditButton } from './locators/locate-edit-button';
import { locateEditField } from './locators/locate-edit-field';
import { locateFirstTreeNode } from './locators/locate-first-tree-node';
import { locateOptions } from './locators/locate-options';

export function commonTests(): void {
  ['/tree', '/treeNoRefresh', '/treeNoRemove', '/treeNoDirty'].forEach(
    (route) => {
      test.describe(`Tree (${route})`, () => {
        test.beforeEach(async ({ page }) => {
          await loadRoute(page, route);
          await page.waitForLoadState('networkidle');
          await page.waitForLoadState('domcontentloaded');
        });

        test('should display dropdown with 3 options', async ({ page }) => {
          await expect(locateOptions(page)).toHaveCount(3);
        });
        test.describe('when we are not hovering over a department', () => {
          test('should not see the edit button', async ({ page }) => {
            await expect(
              locateEditButton(page).filter({ visible: true }),
            ).toHaveCount(0);
          });
          test('should not see the add button', async ({ page }) => {
            await expect(
              locateAddButton(page).filter({ visible: true }),
            ).toHaveCount(0);
          });
          test('should not see the delete button', async ({ page }) => {
            await expect(
              locateDeleteButton(page).filter({ visible: true }),
            ).toHaveCount(0);
          });
        });
        test.describe('when we hover over a department', () => {
          test.beforeEach(async ({ page }) => {
            await locateFirstTreeNode(page).hover();
          });
          test('should display the edit button', async ({ page }) => {
            await expect(
              locateEditButton(page).filter({ visible: true }),
            ).toBeVisible();
          });
          test('should display the add button', async ({ page }) => {
            await expect(
              locateAddButton(page).filter({ visible: true }),
            ).toBeVisible();
          });
          test('should display the delete button', async ({ page }) => {
            await expect(
              locateDeleteButton(page).filter({ visible: true }),
            ).toBeVisible();
          });
          test('the delete button should be disabled', async ({ page }) => {
            await expect(
              locateDeleteButton(page).filter({ visible: true }),
            ).toBeDisabled();
          });
          test.describe('and click the edit button', () => {
            test.beforeEach(async ({ page }) => {
              await locateEditButton(page).filter({ visible: true }).click();
            });
            test('should display the edit form', async ({ page }) => {
              await expect(locateEditField(page)).toBeVisible();
            });
            test.describe('and we add "abc" to the end of the existing input and press enter', () => {
              let inputValue = '';
              test('abc should be added to the end of the input', async ({
                page,
              }) => {
                const inputLocator = locateEditField(page);
                inputValue = await inputLocator.inputValue();
                await inputLocator.fill(inputValue + 'abc');
                await page.keyboard.press('Enter');
                await expect(
                  locateFirstTreeNode(page).locator('span.mdc-button__label'),
                ).toHaveText(inputValue + 'abc');
                await expect(inputLocator).toBeHidden();
                await page.reload();
                // wait for data to load
                await expect(locateOptions(page)).toHaveCount(3);
                await expect(
                  locateFirstTreeNode(page).locator('span.mdc-button__label'),
                ).toHaveText(inputValue + 'abc');
                await locateEditButton(page).filter({ visible: true }).click();
                await inputLocator.fill(inputValue);
                await page.keyboard.press('Enter');
                await expect(
                  locateFirstTreeNode(page).locator('span.mdc-button__label'),
                ).toHaveText(inputValue);
              });
            });
          });
          test.describe('and we click the add button', () => {
            test.beforeEach(async ({ page }) => {
              await locateAddButton(page).filter({ visible: true }).click();
              // wait for the menu container to be visible
              await locateAddMenuContainer(page);
            });
            test('should display the "Document" menu item', async ({
              page,
            }) => {
              const menuItem = await locateAddMenuItem(page, 'Document');
              await expect(menuItem).toBeVisible();
            });
            test('should display the "Folder" menu item', async ({ page }) => {
              await expect(
                await locateAddMenuItem(page, 'Folder'),
              ).toBeVisible();
            });
            test('should display the "Sprint Folder" menu item', async ({
              page,
            }) => {
              await expect(
                await locateAddMenuItem(page, 'Sprint Folder'),
              ).toBeVisible();
            });
            test('should display the "List" menu item', async ({ page }) => {
              await expect(await locateAddMenuItem(page, 'List')).toBeVisible();
            });
            test.describe('and we click the "Document" menu item', () => {
              test.beforeEach(async ({ page }) => {
                await (await locateAddMenuItem(page, 'Document')).click();
                await locateEditField(page).waitFor({ state: 'visible' });
              });
              test('should expand the first department', async ({ page }) => {
                await expect(locate2ndTreeNode(page)).toHaveAttribute(
                  'aria-level',
                  '2',
                );
              });
              test('edit field should contain "New docs"', async ({ page }) => {
                await expect(locateEditField(page)).toHaveValue('New docs');
              });
              test.describe('and we press "ESC"', () => {
                test.beforeEach(async ({ page }) => {
                  await page.keyboard.press('Escape');
                });
                test('the edit field should be hidden', async ({ page }) => {
                  await expect(locateEditField(page)).toBeHidden();
                });
              });
              test.describe('and we enter "New docs abc" and press "Enter"', () => {
                test.beforeEach(async ({ page }) => {
                  await locateEditField(page).click();
                  await locateEditField(page).fill('New docs abc');
                  // Yes, I know, "don't use waitForTimeout", but
                  // this is the only way this code will work
                  await page.waitForTimeout(200);
                  await page.keyboard.press('Enter');
                });
                test('the edit field should be hidden', async ({ page }) => {
                  await expect(locateEditField(page)).toBeHidden({
                    timeout: 2000,
                  });
                });
                test('the new tree node should be visible', async ({
                  page,
                }) => {
                  await expect(page.getByText('New docs abc')).toBeVisible();
                });
                test.afterEach(async ({ page }) => {
                  await page
                    .locator('mat-tree-node')
                    .filter({ hasText: 'New docs abc' })
                    .locator('button[aria-label="delete"]')
                    .click();
                });
              });
            });
          });
        });
      });
    },
  );
}
