// jscpd:ignore-start
// component is intentionally duplicated.
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { TreeComponent as SharedTreeComponent } from '../../shared/components/tree/tree.component';
import { Location } from '../../shared/locations/location.interface';
import { currentLocationSignalStore } from './store/current-location/current-location.signal-store';
import { selectCurrentLocation } from './store/locations/selectors/select-current-location.selectors';
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
  locations: Observable<Location[]> = of([]);
  location: Observable<Location> = of({ id: '', name: '', departments: [] });
  constructor(private store: Store) {}

  locationChanged(event: string): void {
    this.currentLocationSignalStore.setCurrentLocationId(event);
  }

  ngOnInit(): void {
    this.locations = this.store.select(selectLocations);
    this.location = this.store.select(selectCurrentLocation);
  }
}
// jscpd:ignore-end
