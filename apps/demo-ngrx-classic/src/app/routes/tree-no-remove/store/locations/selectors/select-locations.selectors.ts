// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { getTopChildRows } from '@smarttools/smart-ngrx';

import { Location } from '../../../../../shared/locations/location.interface';
import { Top } from '../../../../../shared/top/top.interface';
import { selectTopLocations } from '../../top/select-top-locations.selectors';

export const selectLocations = getTopChildRows<Top, Location>(
  selectTopLocations,
  'locations',
);

// jscpd:ignore-end
