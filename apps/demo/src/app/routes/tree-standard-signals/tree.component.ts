// jscpd:ignore-start
// component is intentionally duplicated.
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { TreeComponent as SharedTreeComponent } from '../../shared/components/tree/tree.component';
import { currentLocationSignalStore } from './store/current-location/current-location.signal-store';
import { selectLocationsDepartments } from './store/locations/selectors/select-locations-departments.selectors';
import { selectLocations } from './store/locations/selectors/select-locations.selector';

@Component({
  selector: 'dmb-demo-tree',
  standalone: true,
  imports: [CommonModule, SharedTreeComponent],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [currentLocationSignalStore],
})
export class TreeComponent {
  selectLocations = selectLocations(); // factory function that returns the real signal
  currentLocationSignalStore = inject(currentLocationSignalStore);
  locationId$ = this.currentLocationSignalStore.selectCurrentLocationId;
  // eslint-disable-next-line @smarttools/no-anonymous-functions -- need fat arrow to be able to see this
  locations$ = computed(() => {
    const locations = this.selectLocations();
    if (locations.length > 0 && typeof locations[0] === 'object') {
      return locations;
    }
    return [];
  });

  // Create the computed signal directly in the component
  // eslint-disable-next-line @smarttools/no-anonymous-functions -- need fat arrow to be able to see this
  location$ = computed(() => {
    return this.selectCurrentLocation();
  });

  locationChanged(event: string): void {
    this.currentLocationSignalStore.setCurrentLocationId(event);
  }

  private selectCurrentLocation(): {
    id: string;
    name: string;
    departments: unknown[];
  } {
    const currentLocationId = this.locationId$();

    // Get the location with departments
    const locationDepartmentsSignal = selectLocationsDepartments;
    const locationState = locationDepartmentsSignal();

    const location = locationState.entities[currentLocationId];

    if (location) {
      // The departments array should automatically handle its child signals
      const departments = location.departments;

      return {
        ...location,
        departments,
      };
    }

    return {
      id: '',
      name: '',
      departments: [],
    };
  }
}
// jscpd:ignore-end
