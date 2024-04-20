import { locationSelectorTestFactory } from '../../../tests/location.selectors.spec';
import {
  selectCurrentLocation,
  selectLocations,
  selectLocationsDepartments,
} from './location.selectors';

describe('tree-no-dirty', () => {
  locationSelectorTestFactory('tree-no-dirty', 'tree-no-dirty2', {
    selectLocations,
    selectLocationsDepartments,
    selectCurrentLocation,
  });
});
