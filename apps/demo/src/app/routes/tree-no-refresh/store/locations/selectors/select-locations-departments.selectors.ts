import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentsChildren } from '../../../../tree-no-remove/store/department/select-departments-children.selectors';
import { selectLocationEntities } from './select-location-entities.selectors';

export const selectLocationsDepartments = createSmartSelector(
  selectLocationEntities,
  [
    {
      childFeature: 'tree-no-refresh',
      childEntity: 'departments',
      parentFeature: 'tree-no-refresh',
      parentEntity: 'locations',
      parentField: 'departments',
      childSelector: selectDepartmentsChildren,
    },
  ],
);
