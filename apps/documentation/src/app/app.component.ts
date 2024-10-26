import { Component } from '@angular/core';
import { NgDocThemeService } from '@ng-doc/app/services/theme';

@Component({
  selector: 'smart-ngrx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'documentation';
  constructor(protected readonly themeService: NgDocThemeService) {}
  setTheme(): void {
    this.themeService.set('auto');
  }
}
