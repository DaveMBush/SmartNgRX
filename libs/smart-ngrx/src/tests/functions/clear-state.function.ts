import { MockStore } from '@ngrx/store/testing';
import { castTo } from '@smarttools/smart-core';

import { store } from '../../smart-selector/store.function';

/**
 * Used to clear the state of the store during testing
 */
export function clearState(): void {
  castTo<MockStore>(store()).setState({});
}
