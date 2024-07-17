// jscpd:ignore-start
// component is intentionally duplicated.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Location } from '../../shared/locations/location.interface';
import { SharedModule } from '../../shared/shared.module';
import { currentLocationActions } from './store/current-location/current-location.actions';
import { selectCurrentLocationId } from './store/current-location/current-location.selector';
import { selectCurrentLocation } from './store/locations/location.selectors';
import { selectLocations } from './store/top/top.selector';

@Component({
  selector: 'dmb-demo-tree-virtual',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './tree-virtual.component.html',
  styleUrls: ['./tree-virtual.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeVirtualComponent implements OnInit {
  locationId: Observable<number | string> = of('');
  locations: Observable<Location[]> = of([]);
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
