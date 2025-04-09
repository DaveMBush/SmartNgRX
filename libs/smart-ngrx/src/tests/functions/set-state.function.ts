import { MockStore } from '@ngrx/store/testing';
import { castTo } from '@smarttools/core';
import { take } from 'rxjs/operators';

import { store } from '../../smart-selector/store.function';

/**
 * Sets the state of the store during unit testing.  This grabs
 * the current state and adds the new state to it. If the
 * feature and entity already exist, it will overwrite that
 * state while leaving the rest of the store alone.
 *
 * @param feature the feature to set
 * @param entity the entity name to set
 * @param state the state to set
 */
export function setState<T>(feature: string, entity: string, state: T): void {
  store()
    .pipe(take(1))
    .subscribe(function setStateInternal(s) {
      const sAsRecord = s as Record<string, Record<string, object>>;
      const existingFeature = sAsRecord[feature] ?? {};
      const newState = {
        ...s,
        [feature]: { ...existingFeature, [entity]: state },
      };
      castTo<MockStore>(store()).setState(newState);
    });
}
