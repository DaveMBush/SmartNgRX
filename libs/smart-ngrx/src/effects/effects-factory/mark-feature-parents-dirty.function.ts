import { ActionGroup } from '../../actions/action-group.interface';
import { ParentInfo } from '../../actions/parent-info.interface';
import { forNext } from '../../common/for-next.function';
import { StringLiteralSource } from '../../ngrx-internals/string-literal-source.type';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { markParentsDirty } from './mark-parents-dirty.function';

/**
 * Goes through each of the feature/entity parents and marks the parent row(s) as dirty
 *
 * @param action the action that has the parentInfo in it
 */
export function markFeatureParentsDirty(
  action: ReturnType<ActionGroup<SmartNgRXRowBase>['delete']>,
) {
  forNext(action.parentInfo, (parentInfo: ParentInfo) => {
    markParentsDirty(
      parentInfo.feature as StringLiteralSource<string>,
      parentInfo.entity as StringLiteralSource<string>,
      parentInfo.ids,
    );
  });
}
