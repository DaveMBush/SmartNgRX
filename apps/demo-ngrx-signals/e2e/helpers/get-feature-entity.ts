/* eslint-disable @typescript-eslint/naming-convention -- special variable for e2e testing */
/* eslint-disable no-underscore-dangle -- special variable for e2e testing */
import { EntityState } from '@ngrx/entity';
import { Page } from '@playwright/test';

declare global {
  interface Window {
    __SMART_SIGNALS__: {
      facadeRegistry: {
        hasFacade(feature: string, entity: string): boolean;
        register(
          feature: string,
          entity: string,
        ): {
          getEntityState(): EntityState<unknown>;
        };
      };
    };
  }
}
export async function getFeatureEntity(
  page: Page,
  feature: string,
  entity: string,
): Promise<EntityState<unknown> | undefined> {
  return page.evaluate(function getFeatureEntityEvaluate():
    | EntityState<unknown>
    | undefined {
    const registry = window.__SMART_SIGNALS__.facadeRegistry;
    if (registry.hasFacade(feature, entity)) {
      const facade = registry.register(feature, entity);
      return facade.getEntityState();
    }
  });
}
