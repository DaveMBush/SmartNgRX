import { EntityState } from '@ngrx/entity';
import { Page } from '@playwright/test';

import { getStoreFeature } from './get-store-feature';

export async function getFeatureEntity<T>(
  page: Page,
  feature: string,
  entity: string,
): Promise<EntityState<T>> {
  const state = await getStoreFeature(page, feature);
  return state[entity] as EntityState<T>;
}
