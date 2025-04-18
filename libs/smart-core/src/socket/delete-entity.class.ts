import { forNext } from '../common/for-next.function';
import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { BaseChildDefinition } from '../types/base-child-definition.interface';
import { ParentInfo } from '../types/parent-info.interface';

/**
 *
 */
export class DeleteEntity {
  /**
   * class used to delete an entity from the store
   * the main work is to remove the ID from any parent
   * rows that may be pointing to it.
   *
   * @param feature the feature the row is in.
   * @param entity the entity name the row is in
   * @param ids the ids of the rows to delete
   * @param callback the removeIdFromParents callback to call when the row is deleted
   */
  constructor(
    private readonly feature: string,
    private readonly entity: string,
    private readonly ids: string[],
    private readonly callback: (
      childDefinition: BaseChildDefinition,
      id: string,
      parentInfo: ParentInfo[],
    ) => void,
  ) {}

  /**
   * This is what does the work of deleting the ids.
   */
  deleteEntity(): void {
    const childDefinitions = childDefinitionRegistry.getChildDefinition(
      this.feature,
      this.entity,
    );
    const parentInfo: ParentInfo[] = [];
    forNext(
      childDefinitions,
      this.deleteEntityByChildDefinition(parentInfo),
    );
  }

  private deleteEntityByChildDefinition(parentInfo: ParentInfo[]) {
    const context = this;
    return function deletedEntityForChildDefinition(
      childDefinition: BaseChildDefinition,
    ) {
      forNext(context.ids, function deleteEntityForChildAndId(id) {
        context.callback(childDefinition, id, parentInfo);
      });
    };
  }
}
