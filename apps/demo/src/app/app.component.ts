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
  activeLink = '';

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      /* istanbul ignore next -- trivial condition obvious at runtime */
      if (event instanceof NavigationEnd) {
        this.activeLink = event.urlAfterRedirects.split('/')[1];
      }
    });
  }
}
