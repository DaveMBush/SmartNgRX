// jscpd:ignore-start
// component is intentionally duplicated.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TreeComponent as SharedTreeComponent } from '../../shared/components/tree/tree.component';
import { currentLocationSignalStore } from './store/current-location/current-location.signal-store';
import { selectCurrentLocationSignal } from './store/current-location/select-current-location.signal';
import { selectLocations } from './store/locations/selectors/select-locations.selector';
@Component({
  selector: 'dmb-demo-tree-standard',
  standalone: true,
  imports: [CommonModule, SharedTreeComponent],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [currentLocationSignalStore],
})
export class TreeComponent {
  currentLocationSignalStore = inject(currentLocationSignalStore);
  locationId$ = this.currentLocationSignalStore.selectCurrentLocationId;
  locations$ = selectLocations;

  // Create the computed signal directly in the component

  location$ = selectCurrentLocationSignal(this.currentLocationSignalStore);

  locationChanged(event: string): void {
    this.currentLocationSignalStore.setCurrentLocationId(event);
  }
}
// jscpd:ignore-end
