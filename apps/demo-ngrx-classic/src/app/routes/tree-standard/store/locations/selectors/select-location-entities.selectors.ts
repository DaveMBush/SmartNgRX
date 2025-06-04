import { createSmartSelector } from '@smarttools/smart-ngrx';

import { Location } from '../../../../../shared/locations/location.interface';

export const selectLocationEntities = createSmartSelector<Location>(
  'tree-standard',
  'locations',
);
