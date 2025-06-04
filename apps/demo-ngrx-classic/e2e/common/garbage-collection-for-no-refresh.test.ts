// jscpd:ignore-start
// test code is intentionally duplicated
import { expect, test } from '@playwright/test';
import {
  locateFirstTreeNode,
  locateHomeLink,
  locateOptions,
} from '@smarttools/e2e-common';

import { getFeatureEntity } from '../helpers/get-feature-entity';

const featureName = 'tree-no-refresh';

test.describe('Garbage collection for no refresh', () => {
  test.setTimeout(6 * 1000 * 60);
  test('collects garbage', async ({ page }) => {
    await page.goto('http://localhost:4200/treeNoRefresh');
    await expect(locateOptions(page)).toHaveCount(3);
    let locationsState = await getFeatureEntity(page, featureName, 'locations');
    expect(Object.keys(locationsState.entities).length).toBe(3);
    await expect(locateFirstTreeNode(page)).toBeVisible();
    let departmentsState = await getFeatureEntity(
      page,
      featureName,
      'departments',
    );
    expect(Object.keys(departmentsState.entities).length).not.toBe(0);
    let departmentChildrenState = await getFeatureEntity(
      page,
      featureName,
      'departmentChildren',
    );
    expect(Object.keys(departmentChildrenState.entities).length).toBe(0);
    await locateHomeLink(page).click();
    // eslint-disable-next-line playwright/no-wait-for-timeout -- need to wait specific time to test garbage collection
    await page.waitForTimeout(5.5 * 1000 * 60);
    locationsState = await getFeatureEntity(page, featureName, 'locations');
    expect(Object.keys(locationsState.entities).length).toBe(0);
    departmentsState = await getFeatureEntity(page, featureName, 'departments');
    expect(Object.keys(departmentsState.entities).length).toBe(0);
    departmentChildrenState = await getFeatureEntity(
      page,
      featureName,
      'departmentChildren',
    );
    expect(Object.keys(departmentChildrenState.entities).length).toBe(0);
  });
});
// jscpd:ignore-end
