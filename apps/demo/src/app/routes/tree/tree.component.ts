import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SharedModule } from '../../shared/shared.module';
import { Location } from '../../shared/store/locations/location.interface';
import { selectCurrentLocation } from '../../shared/store/locations/location.selectors';

@Component({
  selector: 'dmb-demo-tree',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent implements OnInit {
  location!: Observable<Location>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.location = this.store.select(selectCurrentLocation);
  }
}
