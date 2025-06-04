// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSmartSelector } from '@smarttools/smart-ngrx';

import { Location } from '../../../../../shared/locations/location.interface';

export const selectLocationEntities = createSmartSelector<Location>(
  'tree-no-refresh',
  'locations',
);
// jscpd:ignore-end
