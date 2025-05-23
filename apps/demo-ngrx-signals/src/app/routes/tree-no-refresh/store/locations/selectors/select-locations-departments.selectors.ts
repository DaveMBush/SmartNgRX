// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSmartSignal } from '@smarttools/smart-signals';

import { featureName } from '../../../feature.const';
import { selectDepartmentsChildren } from '../../department/select-departments-children.selector';
import { selectLocationEntities } from './select-location-entities.selectors';

export const selectLocationsDepartments = createSmartSignal(
  selectLocationEntities,
  [
    {
      childFeature: featureName,
      childEntity: 'departments',
      parentField: 'departments',
      parentFeature: featureName,
      parentEntity: 'locations',
      childSelector: selectDepartmentsChildren,
    },
  ],
);
// jscpd:ignore-end
