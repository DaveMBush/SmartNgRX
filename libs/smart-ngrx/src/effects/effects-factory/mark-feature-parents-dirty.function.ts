import { ParentInfo } from '../../actions/parent-info.interface';
import { forNext } from '../../common/for-next.function';
import { markParentsDirty } from './mark-parents-dirty.function';

/**
 * Goes through each of the feature/entity parents and marks the parent row(s) as dirty
 *
 * @param parentInfoArray the array of parentInfo objects that we use to mark the
 * parent row of the child as dirty so it will refresh.
 */
export function markFeatureParentsDirty(
  parentInfoArray: ParentInfo[],
) {
  forNext(
    parentInfoArray,
    function markFeatureParentsDirtyForNext(parentInfo: ParentInfo) {
      markParentsDirty(parentInfo.feature, parentInfo.entity, parentInfo.ids);
    },
  );
}
