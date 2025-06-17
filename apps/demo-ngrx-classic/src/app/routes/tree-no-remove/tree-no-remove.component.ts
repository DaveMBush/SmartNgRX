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
import { SmartNgRXRowBase } from '@smarttools/smart-ngrx';
import { Observable, of } from 'rxjs';

import { TreeComponent as SharedTreeComponent } from '../../shared/components/tree/tree.component';
import { Location } from '../../shared/locations/location.interface';
import { currentLocationActions } from './store/current-location/current-location.actions';
import { selectCurrentLocationId } from './store/current-location/select-current-location.selectors';
import { selectCurrentLocation } from './store/locations/selectors/select-current-location.selectors';
import { selectLocations } from './store/locations/selectors/select-locations.selectors';

@Component({
  selector: 'dmb-tree-no-remove',
  standalone: true,
  imports: [CommonModule, SharedTreeComponent],
  templateUrl: './tree-no-remove.component.html',
  styleUrls: ['./tree-no-remove.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeNoRemoveComponent implements OnInit {
  locationId: Observable<number | string> = of('');
  locations: Observable<(Location & SmartNgRXRowBase)[]> = of([]);
  location: Observable<Location> | null = null;
  private store = inject(Store);

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
