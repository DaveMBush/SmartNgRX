import { test } from '@playwright/test';
import { commonTests } from '@smarttools/e2e-common';

test.describe('ngrx-signals', () => {
  commonTests();
  test('dummy test', () => {
    test.expect(true).toBe(true);
  });
});
