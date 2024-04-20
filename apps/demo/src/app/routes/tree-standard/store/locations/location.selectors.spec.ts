import { locationSelectorTestFactory } from '../../../tests/location.selectors.spec';
import {
  selectCurrentLocation,
  selectLocations,
  selectLocationsDepartments,
} from './location.selectors';

describe('tree-standard', () => {
  locationSelectorTestFactory('tree-standard', 'tree-standard2', {
    selectLocations,
    selectLocationsDepartments,
    selectCurrentLocation,
  });
});
