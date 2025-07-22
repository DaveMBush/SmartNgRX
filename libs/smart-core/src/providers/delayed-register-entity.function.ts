import { globalMarkAndDeleteInit } from '../mark-and-delete/global-mark-and-delete-init.class';
import { markAndDeleteEntities } from '../mark-and-delete/mark-and-delete-entities.class';
import { entityRegistry } from '../registrations/entity-registry.class';
import { MarkAndDeleteInit } from '../types/mark-and-delete-init.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { resolveRemoveTime } from './resolve-remove-time.function';

/**
 * We can't, necessarily, register an entity as part of the
 * provideSmartFeatureEntities() function because it gets called
 * while the Routes are being registered.  This means that the
 * getGlobalMarkAndDeleteInit() function will return an empty object
 * when it should return a full MarkAndDeleteInit object.
 *
 * This function exists to wait until the MarkAndDeleteInit object
 * is fully populated before registering the entity.
 *
 * @param featureName the feature to register
 * @param entityName the entity in the feature to register
 * @param entityDefinition the entity definition that was originally
 * passed to provideSmartFeatureEntities()
 * @returns true if the entity can't be registered yet and false if it has
 * this is so it works with the takeWhile() in the calling code.
 */
export function delayedRegisterEntity(
  featureName: string,
  entityName: string,
  entityDefinition: SmartEntityDefinition<SmartNgRXRowBase>,
): boolean {
  const globalInit = globalMarkAndDeleteInit.get();
  /* istanbul ignore else -- difficult to test  */
  if (globalInit.removeTime === undefined) {
    return true;
  }
  const init = {
    ...globalInit,
    ...entityDefinition.markAndDelete,
  } as MarkAndDeleteInit;
  init.removeTime = resolveRemoveTime(init);

  entityRegistry.register(featureName, entityName, {
    defaultRow: entityDefinition.defaultRow,
    markAndDeleteInit: init,
    markAndDeleteEntityMap: markAndDeleteEntities.map(featureName, entityName),
  });
  return false;
}
