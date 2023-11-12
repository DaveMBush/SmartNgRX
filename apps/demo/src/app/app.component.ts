import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatToolbarModule,
    MatTabsModule,
  ],
  selector: 'dmb-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  activeLink = 'tree';

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.urlAfterRedirects.split('/')[1];
      }
    });
  }
}
