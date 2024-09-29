import { ActionService } from '../actions/action.service';
import { psi } from '../common/psi.const';

const actionServiceMap = new Map<string, ActionService>();

/**
 * mechanism for getting the ActionService object/class for a given feature and entity
 *
 * @param feature the feature
 * @param entity the entity
 * @returns the ActionService object/class for the given feature and entity
 */
export function actionServiceRegistry(
  feature: string,
  entity: string,
): ActionService | null {
  const key = `${feature}${psi}${entity}`;
  let actionServiceCache = actionServiceMap.get(key);
  if (actionServiceCache === undefined) {
    actionServiceCache = new ActionService(feature, entity);
    if (!actionServiceCache.init()) {
      return null;
    }
    actionServiceMap.set(key, actionServiceCache);
  }
  return actionServiceCache;
}
