import { EntityAdapter } from '@ngrx/entity';

import { assert } from '../common/assert.function';
import { psi } from '../common/theta.const';

const adapterMap = new Map<string, EntityAdapter<unknown>>();
/**
 * This function is used to get the adapter for the entity.
 *
 * @param feature The feature the entity belongs to
 * @param entity The entity to get the adapter for
 * @param adapter The adapter for the entity
 *
 * @returns The adapter for the entity
 */
export function adapterForEntity<C>(
  feature: string,
  entity: string,
  adapter?: EntityAdapter<C>,
): EntityAdapter<C> {
  if (adapter) {
    adapterMap.set(
      `${feature}${psi}${entity}`,
      adapter as EntityAdapter<unknown>,
    );
  }
  const cachedAdapter = adapterMap.get(`${feature}${psi}${entity}`) as
    | EntityAdapter<C>
    | undefined;
  assert(
    !!cachedAdapter,
    `No adapter found for feature: ${feature} and entity: ${entity}`,
  );
  return cachedAdapter;
}
