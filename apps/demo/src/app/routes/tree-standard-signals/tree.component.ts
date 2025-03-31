// jscpd:ignore-start
// component is intentionally duplicated.
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';

import { TreeComponent as SharedTreeComponent } from '../../shared/components/tree/tree.component';
import { Location } from '../../shared/locations/location.interface';
import { currentLocationSignalStore } from './store/current-location/current-location.signal-store';
import { selectCurrentLocationSignal } from './store/current-location/select-current-location.signal';
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

  location$ = selectCurrentLocationSignal;

  locationChanged(event: string): void {
    this.currentLocationSignalStore.setCurrentLocationId(event);
  }
}
// jscpd:ignore-end
