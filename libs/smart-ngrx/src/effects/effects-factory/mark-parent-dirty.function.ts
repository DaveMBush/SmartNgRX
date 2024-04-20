import { StringLiteralSource } from '../../ngrx-internals/string-literal-source.type';
import { actionServiceRegistry } from '../../registrations/action.service.registry';

/**
 * Common function to mark the parent row as dirty
 *
 * @param parentFeature the feature the parent is part of
 * @param parentEntity the entity the parent is part of
 * @param parentId the id of the parent to mark dirty
 */
export function markParentDirty(
  parentFeature: StringLiteralSource<string>,
  parentEntity: StringLiteralSource<string>,
  parentId: string,
): void {
  const parentService = actionServiceRegistry(parentFeature, parentEntity);
  parentService.updateMany([{ id: parentId, changes: { isDirty: true } }]);
}
