import { ParentInfo } from '../../actions/parent-info.interface';
import { forNext } from '../../common/for-next.function';
import { markParentsDirty } from './mark-parents-dirty.function';

/**
 * Goes through each of the feature/entity parents and marks the parent row(s) as dirty
 *
 * @param action the action that has the parentInfo in it
 * @param action.id the id of the row the parent is for
 * @param action.parentInfo the parent feature, entity and ids to mark as dirty
 */
export function markFeatureParentsDirty(action: {
  id: string;
  parentInfo: {
    feature: string;
    entity: string;
    ids: string[];
  }[];
}) {
  forNext(
    action.parentInfo,
    function markFeatureParentsDirtyForNext(parentInfo: ParentInfo) {
      markParentsDirty(parentInfo.feature, parentInfo.entity, parentInfo.ids);
    },
  );
}
