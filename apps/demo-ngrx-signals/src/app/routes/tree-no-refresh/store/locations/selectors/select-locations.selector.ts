// jscpd:ignore-start
// intentionally duplicated.
import { getTopChildRows } from '@smarttools/smart-signals';

import { Location } from '../../../../../shared/locations/location.interface';
import { Top } from '../../../../../shared/top/top.interface';
import { selectTopLocations } from '../../top/select-top-locations.selectors';

export const selectLocations = getTopChildRows<Top, Location>(
  selectTopLocations,
  'locations',
);
// jscpd:ignore-end
