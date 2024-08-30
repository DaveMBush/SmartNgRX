// jscpd:ignore-start
// component is intentionally duplicated.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, of } from 'rxjs';

import { Location } from '../../shared/locations/location.interface';
import { SharedModule } from '../../shared/shared.module';
import { currentLocationActions } from './store/current-location/current-location.actions';
import { selectCurrentLocationId } from './store/current-location/current-location.selector';
import { selectCurrentLocation } from './store/locations/location.selectors';
import { selectLocations } from './store/top/top.selector';

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
  locations: Observable<Location[]> = of([]);
  location: Observable<Location> | null = null;
  constructor(private store: Store) {}

  locationChanged(event: string): void {
    this.store.dispatch(currentLocationActions.set({ id: event }));
  }

  ngOnInit(): void {
    this.locations = this.store.select(selectLocations);
    this.locationId = this.store.select(selectCurrentLocationId);
    this.location = this.store.select(selectCurrentLocation).pipe(
      // this prevents the tree from painting too often
      debounceTime(100),
    );
  }
}
// jscpd:ignore-end
