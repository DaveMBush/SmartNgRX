import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  selector: 'dmb-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private router = inject(Router);
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
  }
}
