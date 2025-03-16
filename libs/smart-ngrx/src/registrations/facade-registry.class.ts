import { assert } from '../common/assert.function';
import { psi } from '../common/psi.const';
import { ClassicNgrxFacade } from '../facades/classic-ngrx.facade';
import { FacadeBase } from '../facades/facade.base';
import { SignalsFacade } from '../facades/signals-facade';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

class FacadeRegistry {
  facadeMap = new Map<string, FacadeBase>();

  /**
   * mechanism for getting the ActionService object/class for a given feature and entity
   *
   * @param feature the feature
   * @param entity the entity
   * @param isSignal whether the facade is a signal facade. default is false
   * @returns the ActionService object/class for the given feature and entity
   */
  register<T extends SmartNgRXRowBase>(
    feature: string,
    entity: string,
    isSignal: boolean = false,
  ): FacadeBase<T> {
    const key = `${feature}${psi}${entity}`;
    let facadeCache = this.facadeMap.get(key);
    if (facadeCache === undefined) {
      facadeCache = isSignal
        ? new SignalsFacade(feature, entity)
        : new ClassicNgrxFacade(feature, entity);
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
