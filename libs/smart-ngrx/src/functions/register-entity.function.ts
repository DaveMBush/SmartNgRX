// using a record here instead of a Map for performance reasons

import { assert } from '../common/assert.function';
import { EntityAttributes } from '../types/entity-attributes.interface';

// We don't need any features that Map would provide
const registry: Record<string, EntityAttributes> = {};

/**
 * Internal function used to register attributes the entity will need
 * later on.
 * @param feature the feature we used when we registered the entity in the providers
 * @param fieldName the fieldName we used when we registered the entity in the providers
 * @param attributes things we want to be able to get at later.
 * @returns
 */
export function registerEntity(
  feature: string,
  fieldName: string,
  attributes?: EntityAttributes,
): EntityAttributes {
  if (attributes !== undefined) {
    assert(
      registry[feature + ':' + fieldName] === undefined,
      'Entity already registered',
    );
    registry[feature + ':' + fieldName] = attributes;
  }
  return registry[feature + ':' + fieldName];
}

/**
 * This function exist so we can unregister entities in unit tests.
 * @param feature the feature we used when we registered the entity
 * in the providers
 * @param fieldName the fieldName we used when we registered the
 * entity in the providers
 */
export function unregisterEntity(feature: string, fieldName: string): void {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- need this if we are going to use Records instead of Map
  delete registry[feature + ':' + fieldName];
}
