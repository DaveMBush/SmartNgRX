import { assert } from '../../common/assert.function';
import { actionServiceRegistry } from '../../registrations/action-service-registry.class';

/**
 * Common function to mark the parent row as dirty
 *
 * @param parentFeature the feature the parent is part of
 * @param parentEntity the entity the parent is part of
 * @param parentIds the ids of the parents to mark dirty
 */
export function markParentsDirty(
  parentFeature: string,
  parentEntity: string,
  parentIds: string[],
): void {
  const parentService = actionServiceRegistry.register(
    parentFeature,
    parentEntity,
  );
  assert(
    !!parentService,
    `the service for ${parentFeature}:${parentEntity} is not available`,
  );
  parentService.updateMany(
    parentIds.map(function markParentsDirtyMapItem(id) {
      return {
        id,
        changes: { isDirty: true },
      };
    }),
  );
}
