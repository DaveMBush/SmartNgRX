import { assert } from '../common/assert.function';
import { psi } from '../common/psi.const';
import { FacadeBase } from '../facades/facade.base';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

class FacadeRegistry {
  facadeMap = new Map<string, FacadeBase>();

  /**
   * mechanism for getting the ActionService object/class for a given feature and entity
   *
   * @param feature the feature
   * @param entity the entity
   * @param facadeConstructor the constructor that will initialize the facade
   * @returns the ActionService object/class for the given feature and entity
   */
  register<T extends SmartNgRXRowBase>(
    feature: string,
    entity: string,
    facadeConstructor?: new (feature: string, entity: string) => FacadeBase,
  ): FacadeBase<T> {
    const key = `${feature}${psi}${entity}`;
    let facadeCache = this.facadeMap.get(key);
    if (facadeCache === undefined) {
      assert(!!facadeConstructor, 'facadeConstructor is required here');
      facadeCache = new facadeConstructor(feature, entity);
      this.facadeMap.set(key, facadeCache);
      assert(facadeCache.init(), 'ActionService init failed');
    }
    return facadeCache as unknown as FacadeBase<T>;
  }

  hasFacade(feature: string, entity: string): boolean {
    const key = `${feature}${psi}${entity}`;
    return this.facadeMap.has(key);
  }

  /**
   * Only used for testing so we can clear the registry
   * between unit tests
   */
  clear(): void {
    this.facadeMap.clear();
  }
}

export const facadeRegistry = new FacadeRegistry();
