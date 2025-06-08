/* eslint-disable @typescript-eslint/naming-convention -- special variable for e2e testing */
/* eslint-disable no-underscore-dangle -- special variable for e2e testing */
import { EntityState } from '@ngrx/entity';
import { Page } from '@playwright/test';
import {
  facadeRegistry,
  SignalsFacade,
} from '@smarttools/smart-signals/testing';

declare global {
  interface Window {
    __SMART_SIGNALS__: {
      facadeRegistry: typeof facadeRegistry;
    };
  }
}
export async function getFeatureEntity(
  page: Page,
  feature: string,
  entity: string,
): Promise<EntityState<unknown> | undefined> {
  return page.evaluate(
    function getFeatureEntityEvaluate(params: {
      feature: string;
      entity: string;
    }) {
      const registry = window.__SMART_SIGNALS__.facadeRegistry;
      if (registry.hasFacade(params.feature, params.entity)) {
        const facade = registry.register(
          params.feature,
          params.entity,
        ) as SignalsFacade;
        if (facade.entityState !== undefined) {
          return facade.entityState.entityState();
        }
        const facadeInfo = {
          type: typeof facade,
          methods: Object.getOwnPropertyNames(facade),
          prototype: Object.getOwnPropertyNames(Object.getPrototypeOf(facade)),
        };
        throw new Error(
          `Expected entityState to be a field, got ${typeof facade.entityState}. ` +
            `Facade info: ${JSON.stringify(facadeInfo)}`,
        );
      }
    },
    { feature, entity },
  );
}
