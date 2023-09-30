import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SharedModule } from './shared/shared.module';
import { Location } from './shared/store/locations/location.interface';
import { selectCurrentLocation } from './shared/store/locations/location.selectors';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, HttpClientModule],
  selector: 'dmb-dynamic-ngrx-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'smart-ngrx';
  location!: Observable<Location>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.location = this.store.select(selectCurrentLocation);
  }
}
