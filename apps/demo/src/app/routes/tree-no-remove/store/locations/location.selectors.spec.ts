import { locationSelectorTestFactory } from '../../../tests/location.selectors.spec';
import {
  selectCurrentLocation,
  selectLocations,
  selectLocationsDepartments,
} from './location.selectors';

describe('tree-no-remove', () => {
  locationSelectorTestFactory('tree-no-remove', 'tree-no-remove2', {
    selectLocations,
    selectLocationsDepartments,
    selectCurrentLocation,
  });
});
