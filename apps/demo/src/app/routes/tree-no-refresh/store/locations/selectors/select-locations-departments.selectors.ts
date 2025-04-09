import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentsChildren } from '../../department/select-departments-children.selectors';
import { selectLocationEntities } from './select-location-entities.selectors';

export const selectLocationsDepartments = createSmartSelector(
  selectLocationEntities,
  [
    {
      type: 'NgRX',
      childFeature: 'tree-no-refresh',
      childEntity: 'departments',
      parentFeature: 'tree-no-refresh',
      parentEntity: 'locations',
      parentField: 'departments',
      childSelector: selectDepartmentsChildren,
    },
  ],
);
