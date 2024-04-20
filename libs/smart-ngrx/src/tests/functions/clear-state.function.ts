import { MockStore } from '@ngrx/store/testing';

import { castTo } from '../../common/cast-to.function';
import { store } from '../../selector/store.function';

/**
 * Used to clear the state of the store during testing
 */
export function clearState(): void {
  castTo<MockStore>(store()).setState({});
}
