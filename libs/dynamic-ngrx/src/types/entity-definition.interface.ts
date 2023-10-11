import { InjectionToken } from '@angular/core';

import { EffectService } from '../effects/effect-service';

/**
 * This is the interface that is used to define the entity for the
 * provideSmartFeatureEntities provider function
 */
export interface EntityDefinition<Row> {
  /**
   * The field name that you'd usually use in the reducer object
   * you'd use in StoreModule.forFeature(featureName, reducer)
   * OR the name you'd use in provideState(featureName, reducer)
   *
   * We also use this name along with the feature as the Source field
   * in actions but this should not matter to you because you'll either
   * be using actions we've created or using your own actions for your
   * specific purposes.
   */
  fieldName: string;
  /**
   * This is the service token related to the service the effect for this entity
   * should call to do CRUD operations against the backend.
   */
  effectServiceToken: InjectionToken<EffectService<Row>>;
  /**
   * The function that returns a default row for the entity when it does not
   * yet exist in the store.
   * @param id The unique identifier for the row. You should use this to set the
   * id of the id row in the default row.
   */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- decorating with void because this should not use this.
  defaultRow(this: void, id: string): Row;
}
