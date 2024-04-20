import { ActionService } from '../actions/action.service';
import { psi } from '../common/theta.const';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

const actionServiceMap = new Map<string, ActionService<SmartNgRXRowBase>>();

/**
 * mechanism for getting the ActionService object/class for a given feature and entity
 *
 * @param feature the feature
 * @param entity the entity
 * @returns the ActionService object/class for the given feature and entity
 */
export function actionServiceRegistry(
  feature: StringLiteralSource<string>,
  entity: StringLiteralSource<string>,
): ActionService<SmartNgRXRowBase> {
  const key = `${feature}${psi}${entity}`;
  let actionServiceCache = actionServiceMap.get(key);
  if (actionServiceCache === undefined) {
    actionServiceCache = new ActionService<SmartNgRXRowBase>(feature, entity);
    actionServiceMap.set(key, actionServiceCache);
  }
  return actionServiceCache;
}
