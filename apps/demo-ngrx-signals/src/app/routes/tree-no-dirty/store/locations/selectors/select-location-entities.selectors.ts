import { createSmartSignal } from '@smarttools/smart-signals';

import { Location } from '../../../../../shared/locations/location.interface';
import { featureName } from '../../../feature.const';
export const selectLocationEntities = createSmartSignal<Location>(
  featureName,
  'locations',
);
