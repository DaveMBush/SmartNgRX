import { ActionService } from '../actions/action.service';
import { psi } from '../common/psi.const';

class ActionServiceRegistry {
  actionServiceMap = new Map<string, ActionService>();
  /**
   * mechanism for getting the ActionService object/class for a given feature and entity
   *
   * @param feature the feature
   * @param entity the entity
   * @returns the ActionService object/class for the given feature and entity
   */
  register(feature: string, entity: string): ActionService | null {
    const key = `${feature}${psi}${entity}`;
    let actionServiceCache = this.actionServiceMap.get(key);
    if (actionServiceCache === undefined) {
      actionServiceCache = new ActionService(feature, entity);
      if (!actionServiceCache.init()) {
        return null;
      }

      this.actionServiceMap.set(key, actionServiceCache);
    }
    return actionServiceCache;
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
