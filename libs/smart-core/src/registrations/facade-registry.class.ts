import { assert } from '../common/assert.function';
import { psi } from '../common/psi.const';
import { FacadeBase } from '../facades/facade.base';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

class FacadeRegistry {
  facadeMap = new Map<string, FacadeBase>();
  facadeConstructorMap = new Map<string, new (feature: string, entity: string) => FacadeBase>();

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
    // the first time this is called, it is call from the provideSmartFeature*Entities function
    // which is too early to create the facade. So, we store the constructor and wait
    // for the next call to create the facade.
    if (facadeConstructor) {
      this.facadeConstructorMap.set(key, facadeConstructor);
      return {} as FacadeBase<T>; // just to satisfy typescript
    }
    let facadeCache = this.facadeMap.get(key);
    if (facadeCache === undefined) {
      facadeConstructor = this.facadeConstructorMap.get(key);
      assert(!!facadeConstructor, 'facadeConstructor is required here');
      facadeCache = new facadeConstructor(feature, entity);
      this.facadeMap.set(key, facadeCache);
      assert(facadeCache.init(), 'ActionService init failed');
      // only need the constructor long enough to initialize the facade
      // the first time it is needed.
      this.facadeConstructorMap.delete(key);
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
