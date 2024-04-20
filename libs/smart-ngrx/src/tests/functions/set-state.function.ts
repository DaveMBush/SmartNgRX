import { MockStore } from '@ngrx/store/testing';
import { take } from 'rxjs/operators';

import { castTo } from '../../common/cast-to.function';
import { store } from '../../selector/store.function';

/**
 * Sets the state of the store.  This grabs the current state and adds
 * the new state to it. If the feature and entity already exist, it will
 * overwrite that state while leaving the rest of the store alone.
 *
 * @param feature the feature to set
 * @param entity the entity name to set
 * @param state the state to set
 */
export function setState<T>(feature: string, entity: string, state: T): void {
  store()
    .select((s) => s)
    .pipe(take(1))
    .subscribe((s) => {
      const sAsRecord = s as Record<string, Record<string, object>>;
      const newState = {
        ...s,
        [feature]: { ...sAsRecord[feature], [entity]: state },
      };
      castTo<MockStore>(store()).setState(newState);
    });
}
