import { ActionService } from '../actions/action.service';
import { psi } from '../common/theta.const';

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
): ActionService {
  const key = `${feature}${psi}${entity}`;
  let actionServiceCache = actionServiceMap.get(key);
  if (actionServiceCache === undefined) {
    actionServiceCache = new ActionService(feature, entity);
    actionServiceMap.set(key, actionServiceCache);
  }
  return actionServiceCache;
}
