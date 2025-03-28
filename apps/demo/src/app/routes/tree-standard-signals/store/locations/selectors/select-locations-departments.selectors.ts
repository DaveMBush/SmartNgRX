// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSmartSignal } from '@smarttools/smart-ngrx';

import { featureName } from '../../../feature.const';
import { selectLocationEntities } from './select-location-entities.selectors';
import { selectDepartmentsChildren } from '../../department/select-departments-children.selector';

export const selectLocationsDepartments = createSmartSignal(selectLocationEntities, [
  {
    type: 'Signal',
    childFeature: featureName,
    childEntity: 'departments',
    parentField: 'departments',
    parentFeature: featureName,
    parentEntity: 'locations',
    childSelector: selectDepartmentsChildren,
  },
]);
// jscpd:ignore-end
