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
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

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
})
export class TreeComponent implements OnInit {
  currentLocationSignalStore = inject(currentLocationSignalStore);
  locationId$ = this.currentLocationSignalStore.selectCurrentLocationId;
  locations$ = computed(function computedLocations$() {
    const locations = selectLocations();
    if (locations.length > 0 && typeof locations[0] === 'object') {
      return locations as Location[];
    }
    return [];
  });
  
  location$ = selectCurrentLocationSignal;
  constructor(private store: Store) {}

  locationChanged(event: string): void {
    this.currentLocationSignalStore.setCurrentLocationId(event);
  }

  ngOnInit(): void {
  }
}
// jscpd:ignore-end
