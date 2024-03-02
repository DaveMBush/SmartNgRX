import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { MarkAndDeleteSelector } from './mark-and-delete-selector.type';

/**
 * The definition of how to access the child data from a parent entity.
 */
export interface ProxyChild<
  P,
  CF extends string = string,
  CE extends string = string,
  PF extends string = string,
  PE extends string = string,
> {
  /**
   * The name of the feature that contains the child data.
   */
  childFeature: StringLiteralSource<CF>;
  /**
   * The fieldName we used to register the entity in the provider.
   */
  childEntity: StringLiteralSource<CE>;
  /**
   *  The selector to retrieve the child data from the store.
   */
  childSelector: MarkAndDeleteSelector;

  /**
   * The name of the field in the parent that contains the child IDs
   */
  parentField: keyof P;

  /**
   * The feature the parent entity is in
   */
  parentFeature: StringLiteralSource<PF>;
  /**
   * The name of the parent entity
   * The parentFeature and parentEntity allow us to get access
   * to the parent adapter and other things we need
   * to add and delete items from the parent entity
   */
  parentEntity: StringLiteralSource<PE>;
}
