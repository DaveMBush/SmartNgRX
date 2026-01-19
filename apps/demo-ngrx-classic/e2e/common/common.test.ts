import { test } from '@playwright/test';
import { commonTests, websocketTests } from '@smarttools/e2e-common';

test.describe('ngrx-classic', () => {
  commonTests();
  websocketTests();

  test('dummy test', () => {
    test.expect(true).toBe(true);
  });
});
