import { InjectionToken } from '@angular/core';

import { EffectService } from '../effects/effect-service';

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
  effectServiceToken: InjectionToken<EffectService<Row>>;
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- decorating with void because this should not use this.
  defaultRow(this: void, id: string): Row;
}
