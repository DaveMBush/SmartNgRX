// jscpd:ignore-start
// intentionally duplicated.
import { createSmartSignal } from '@smarttools/smart-ngrx';

import { Location } from '../../../../shared/locations/location.interface';
import { Top } from '../../../../shared/top/top.interface';
import { featureName } from '../../feature.const';

export const selectTopLocations = createSmartSignal<Top,Location>([
  {
    type: 'Signal',
    childFeature: featureName,
    childEntity: 'locations',
    parentField: 'locations',
    parentFeature: featureName,
    parentEntity: 'top',
  },
]);
// jscpd:ignore-end
