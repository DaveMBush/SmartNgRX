import { Action } from '@ngrx/store';

import { MarkAndDeleteSelector } from './mark-and-delete-selector.type';

/**
 * The definition of how to access the child data from a parent entity.
 */
export interface ProxyChild<P> {
  /**
   *  The selector to retrieve the child data from the store.
   */
  childSelector: MarkAndDeleteSelector;
  /**
   * The action to fire when data is not found in the child store.
   */
  // eslint-disable-next-line @typescript-eslint/method-signature-style -- we want this to be a function, not a method that takes this
  childAction: (p: { ids: string[] }) => Action;
  /**
   * The default row to use when the child data is not found.
   */
  defaultChildRow: unknown;

  /**
   * The name of the property in the parent that contains the child IDs
   */
  childName: keyof P;
}
