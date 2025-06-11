/* eslint-disable @typescript-eslint/naming-convention -- special use for e2e testing */
/* eslint-disable no-underscore-dangle -- special use for e2e testing */

import { Page } from '@playwright/test';

declare global {
  interface Window {
    __APP_STORE__: {
      getState(): Record<string, unknown>;
    };
  }
}

export async function getStoreState(
  page: Page,
): Promise<Record<string, unknown>> {
  return page.evaluate(async function getStoreStateEvaluate(): Promise<
    Record<string, unknown>
  > {
    return Promise.resolve(window.__APP_STORE__.getState());
  });
}
