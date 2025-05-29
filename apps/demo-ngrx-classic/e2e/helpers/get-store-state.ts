/* eslint-disable @typescript-eslint/naming-convention -- special use for e2e testing */
/* eslint-disable no-underscore-dangle -- special use for e2e testing */
/* eslint-disable no-restricted-syntax -- special use for e2e testing */
import { Page } from '@playwright/test';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: {
      connect(): {
        subscribe(
          listener: (message: { type: string; state: string }) => void,
        ): void;
        send(action: unknown, state: unknown): void;
      };
    };
  }
}

export async function getStoreState(
  page: Page,
): Promise<Record<string, unknown>> {
  return page.evaluate(async function getStoreStateEvaluate() {
    return new Promise(function promiseResolve(resolve) {
      const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();
      devTools.subscribe(function devtoolsSubscribe(message: {
        type: string;
        state: string;
      }) {
        if (message.type === 'STATE') {
          resolve(JSON.parse(message.state) as Record<string, unknown>);
        }
      });
      devTools.send({ type: 'GET_STATE' }, {});
    });
  });
}
