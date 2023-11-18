import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { MarkAndDelete } from '@smart/smart-ngrx/types/mark-and-delete.interface';

import { currentLocationActions } from '../../shared/current-location/current-location.actions';
import { selectCurrentLocationId } from '../../shared/current-location/current-location.selector';
import { SharedModule } from '../../shared/shared.module';
import { Location } from '../../shared/store/locations/location.interface';
import {
  selectCurrentLocation,
  selectLocations,
} from '../../shared/store/locations/location.selectors';

@Component({
  selector: 'dmb-demo-tree',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent implements OnInit {
  locationId: Observable<number | string> = of('');
  locations: Observable<(Location & MarkAndDelete)[]> = of([]);
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
