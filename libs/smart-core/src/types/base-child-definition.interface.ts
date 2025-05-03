import { SmartNgRXRowBase } from './smart-ngrx-row-base.interface';

export interface BaseChildDefinition<
  P extends SmartNgRXRowBase = SmartNgRXRowBase,
> {
  /**
   * The name of the feature that contains the child data.
   */
  childFeature: string;
  /**
   * The entity name we used to register the entity in the provider.
   */
  childEntity: string;

  /**
   * The name of the field in the parent that contains the child IDs
   */
  parentField: keyof P;

  /**
   * The feature the parent entity is in
   */
  parentFeature: string;
  /**
   * The name of the parent entity
   * The parentFeature and parentEntity allow us to get access
   * to the parent adapter and other things we need
   * to add and delete items from the parent entity
   */
  parentEntity: string;
}
