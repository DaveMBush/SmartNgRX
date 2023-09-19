import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SharedModule } from './shared/shared.module';
import { Workspace } from './shared/store/workspace/workspace.interface';
import { selectCurrentWorkspace } from './shared/store/workspace/workspace.selectors';

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
  workspace!: Observable<Workspace>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.workspace = this.store.select(selectCurrentWorkspace);
  }
}
