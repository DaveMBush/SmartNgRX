import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, of } from 'rxjs';

import { SocketService } from './shared/socket.service';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- special use for e2e testing
    __APP_STORE__: {
      getState(): Record<string, unknown>;
    };
  }
}

// eslint-disable-next-line no-underscore-dangle -- special use for e2e testing
window.__APP_STORE__ = {
  getState: function getState(): Record<string, unknown> {
    return {} as Record<string, unknown>;
  },
};

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
    MatCheckboxModule,
  ],
  selector: 'dmb-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private store = inject(Store);
  private socketService = inject(SocketService);
  activeLink: Observable<string> = of('');
  static navigationEndRoute(event: NavigationEnd): string {
    return event.urlAfterRedirects.split('/')[1];
  }

  static navigationEndGuard(event: unknown): event is NavigationEnd {
    return event instanceof NavigationEnd;
  }

  ngOnInit(): void {
    this.activeLink = this.router.events.pipe(
      filter(AppComponent.navigationEndGuard),
      map(AppComponent.navigationEndRoute),
    );
    let state = {} as Record<string, unknown>;
    // eslint-disable-next-line @ngrx/no-store-subscription -- special use for e2e testing
    this.store.subscribe(function resolveState(
      s: Record<string, unknown>,
    ): void {
      state = s;
    });
    // eslint-disable-next-line no-underscore-dangle -- special use for e2e testing
    window.__APP_STORE__.getState = function getState(): Record<
      string,
      unknown
    > {
      return state;
    };
  }
}
