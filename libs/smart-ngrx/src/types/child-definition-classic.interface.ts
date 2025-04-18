import { BaseChildDefinition, SmartNgRXRowBase } from '@smarttools/core';

import { SmartNgRXRowBaseSelector } from './smart-ngrx-row-base-selector.type';

/**
 * The definition of how to access the child data from a parent entity.
 */
export interface ChildDefinitionClassic<
  P extends SmartNgRXRowBase = SmartNgRXRowBase,
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
> extends BaseChildDefinition<P> {
  childSelector: SmartNgRXRowBaseSelector<T>;
}
