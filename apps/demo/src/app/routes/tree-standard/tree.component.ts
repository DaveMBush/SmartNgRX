// jscpd:ignore-start
// component is intentionally duplicated.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { TreeComponent as SharedTreeComponent } from '../../shared/components/tree/tree.component';
import { Location } from '../../shared/locations/location.interface';
import { currentLocationActions } from './store/current-location/current-location.actions';
import { selectCurrentLocationId } from './store/current-location/current-location.selector';
import { selectCurrentLocation } from './store/locations/location.selectors';
import { selectLocations } from './store/top/top.selector';

@Component({
  selector: 'dmb-demo-tree',
  standalone: true,
  imports: [CommonModule, SharedTreeComponent],
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
    this.location = this.store.select(selectCurrentLocation);
  }
}
// jscpd:ignore-end
