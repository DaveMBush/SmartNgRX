import { MarkAndDeleteSelector } from './mark-and-delete-selector.type';

/**
 * The definition of how to access the child data from a parent entity.
 */
export interface ProxyChild<P> {
  /**
   * The name of the feature that contains the child data.
   */
  childFeature: string;
  /**
   * The fieldName we used to register the entity in the provider.
   */
  childFieldName: string;
  /**
   *  The selector to retrieve the child data from the store.
   */
  childSelector: MarkAndDeleteSelector;

  /**
   * The name of the field in the parent that contains the child IDs
   */
  parentFieldName: keyof P;
}
