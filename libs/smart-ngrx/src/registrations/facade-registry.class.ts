import { assert } from '../common/assert.function';
import { psi } from '../common/psi.const';
import { ClassicNgrxFacade } from '../facades/classic-ngrx.facade';
import { FacadeBase } from '../facades/facade.base';
import { SignalsFacade } from '../facades/signals-facade';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

class FacadeRegistry {
  actionServiceMap = new Map<string, FacadeBase>();
  /**
   * mechanism for getting the ActionService object/class for a given feature and entity
   *
   * @param feature the feature
   * @param entity the entity
   * @returns the ActionService object/class for the given feature and entity
   */
  register<T extends SmartNgRXRowBase>(
    feature: string,
    entity: string,
    isSignal: boolean = false,
  ): FacadeBase<T> {
    const key = `${feature}${psi}${entity}`;
    let actionServiceCache = this.actionServiceMap.get(key);
    if (actionServiceCache === undefined) {
      actionServiceCache = isSignal ? new SignalsFacade(feature,entity) : new ClassicNgrxFacade(feature, entity);
      this.actionServiceMap.set(key, actionServiceCache);
      assert(actionServiceCache.init(), 'ActionService init failed');
    }
    return actionServiceCache as unknown as FacadeBase<T>;
  }

  hasActionService(feature: string, entity: string): boolean {
    const key = `${feature}${psi}${entity}`;
    return this.actionServiceMap.has(key);
  }

  /**
   * Only used for testing so we can clear the registry
   * between unit tests
   */
  clear(): void {
    this.actionServiceMap.clear();
  }
}

export const facadeRegistry = new FacadeRegistry();
