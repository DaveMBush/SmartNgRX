import { assert, psi } from '@smarttools/core';

import { EntityAttributes } from '../types/entity-attributes.interface';

class EntityRegistry {
  // We don't need any features that Map would provide
  registry: Record<string, EntityAttributes> = {};

  /**
   * Internal function used to register attributes the entity will need
   * later on.
   *
   * @param feature the feature we used when we registered the entity in the providers
   * @param entity the fieldName we used when we registered the entity in the providers
   * @param attributes the `EntityAttributes` we want to be able to get to later.
   * @returns the attributes associated with the entity
   *
   * @see `EntityAttributes`
   */
  register(
    feature: string,
    entity: string,
    attributes: EntityAttributes,
  ): EntityAttributes {
    assert(
      this.registry[feature + psi + entity] === undefined,
      'Entity already registered',
    );
    this.registry[feature + psi + entity] = attributes;
    return this.registry[feature + psi + entity];
  }

  /**
   * This function is used to get the attributes we registered
   * earlier.
   *
   * @param feature the feature we used when we registered the entity
   * in the providers
   * @param entity the fieldName we used when we registered the
   * entity in the providers
   * @returns the `EntityAttributes` associated with the entity
   */
  get(feature: string, entity: string): EntityAttributes {
    const reg = this.registry[feature + psi + entity];
    assert(reg !== undefined, 'Entity not registered');
    return reg;
  }

  /**
   * This function exist so we can unregister entities in unit tests.
   *
   * @param feature the feature we used when we registered the entity
   * in the providers
   * @param entity the fieldName we used when we registered the
   * entity in the providers
   */
  unregister(feature: string, entity: string): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- need this if we are going to use Records instead of Map
    delete this.registry[feature + psi + entity];
  }
}

export const entityRegistry = new EntityRegistry();
