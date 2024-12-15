import { ActionService } from '../actions/action.service';
import { psi } from '../common/psi.const';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

class ActionServiceRegistry {
  actionServiceMap = new Map<string, ActionService<SmartNgRXRowBase>>();
  /**
   * mechanism for getting the ActionService object/class for a given feature and entity
   *
   * @param feature the feature
   * @param entity the entity
   * @returns the ActionService object/class for the given feature and entity
   */
  register<T extends SmartNgRXRowBase>(feature: string, entity: string): ActionService<T> | null {
    const key = `${feature}${psi}${entity}`;
    let actionServiceCache = this.actionServiceMap.get(key);
    if (actionServiceCache === undefined) {
      actionServiceCache = new ActionService(feature, entity);
      this.actionServiceMap.set(key, actionServiceCache);
    }
    if (!actionServiceCache.init()) {
      return null;
    }
    return actionServiceCache as unknown as ActionService<T>;
  }

  /**
   * Only used for testing so we can clear the registry
   * between unit tests
   */
  clear(): void {
    this.actionServiceMap.clear();
  }
}

export const actionServiceRegistry = new ActionServiceRegistry();
