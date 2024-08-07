import {
  provideSearchEngine,
  NgDocDefaultSearchEngine,
  NgDocSidebarComponent,
  NgDocNavbarComponent,
  provideNgDocApp,
  NgDocRootComponent,
  providePageSkeleton,
  provideMainPageProcessor,
  NG_DOC_DEFAULT_PAGE_SKELETON,
  NG_DOC_DEFAULT_PAGE_PROCESSORS,
  NG_DOC_NIGHT_THEME,
  NgDocThemeToggleComponent,
} from '@ng-doc/app';
import { NG_DOC_ROUTING, provideNgDocContext } from '@ng-doc/generated';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgDocIconComponent, NgDocTooltipDirective } from '@ng-doc/ui-kit';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        ...NG_DOC_ROUTING.map((route) => {
          if (route.path === 'home') {
            route.path = '';
            route.pathMatch = 'full';
          }
          return route;
        }),
        {
          path: '**',
          redirectTo: '',
        },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        scrollOffset: [0, 70],
      },
    ),
    NgDocRootComponent,
    NgDocSidebarComponent,
    NgDocNavbarComponent,
    NgDocThemeToggleComponent,
    NgDocIconComponent,
    NgDocTooltipDirective,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideSearchEngine(NgDocDefaultSearchEngine),
    provideNgDocApp({
      themes: [
        {
          id: NG_DOC_NIGHT_THEME.id,
          path: NG_DOC_NIGHT_THEME.path,
        },
      ],
    }),
    provideNgDocContext(),
    providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
    provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS),
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
