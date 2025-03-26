// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSmartSignal } from '@smarttools/smart-ngrx';

import { Department } from '../../../../../shared/department/department.interface';
import { Location } from '../../../../../shared/locations/location.interface';
import { featureName } from '../../../feature.const';

export const selectLocationsDepartments = createSmartSignal<
  Location,
  Department
>([
  {
    type: 'Signal',
    childFeature: featureName,
    childEntity: 'departments',
    parentField: 'departments',
    parentFeature: featureName,
    parentEntity: 'locations',
  },
]);
// jscpd:ignore-end
