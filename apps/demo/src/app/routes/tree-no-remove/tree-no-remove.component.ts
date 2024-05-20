// jscpd:ignore-start
// component is intentionally duplicated.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { SmartNgRXRowBase } from '@smart/smart-ngrx/types/smart-ngrx-row-base.interface';

import { Location } from '../../shared/locations/location.interface';
import { SharedModule } from '../../shared/shared.module';
import { currentLocationActions } from './store/current-location/current-location.actions';
import { selectCurrentLocationId } from './store/current-location/current-location.selector';
import { selectCurrentLocation } from './store/locations/location.selectors';
import { selectLocations } from './store/top/top.selector';

@Component({
  selector: 'dmb-tree-no-remove',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './tree-no-remove.component.html',
  styleUrls: ['./tree-no-remove.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeNoRemoveComponent implements OnInit {
  locationId: Observable<number | string> = of('');
  locations: Observable<(Location & SmartNgRXRowBase)[]> = of([]);
  location: Observable<Location> | null = null;
  constructor(private store: Store) {}

  locationChanged(event: string): void {
    this.store.dispatch(currentLocationActions.set({ id: event }));
  }

  ngOnInit(): void {
    this.locations = this.store.select(selectLocations);
    this.locationId = this.store.select(selectCurrentLocationId);
    this.location = this.store.select(selectCurrentLocation);
  }
}
// jscpd:ignore-end
