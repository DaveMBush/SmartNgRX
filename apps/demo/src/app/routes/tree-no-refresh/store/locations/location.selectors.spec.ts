import { locationSelectorTestFactory } from '../../../tests/location.selectors.spec';
import {
  selectCurrentLocation,
  selectLocations,
  selectLocationsDepartments,
} from './location.selectors';

describe('tree-no-refresh', () => {
  locationSelectorTestFactory('tree-no-refresh', 'tree-no-refresh2', {
    selectLocations,
    selectLocationsDepartments,
    selectCurrentLocation,
  });
});
