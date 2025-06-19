import {
  provideSearchEngine,
  NgDocDefaultSearchEngine,
  provideNgDocApp,
  providePageSkeleton,
  provideMainPageProcessor,
  NG_DOC_DEFAULT_PAGE_SKELETON,
  NG_DOC_DEFAULT_PAGE_PROCESSORS,
  provideMermaid,
} from '@ng-doc/app';
import { NgDocNavbarComponent } from '@ng-doc/app/components/navbar';
import { NgDocThemeToggleComponent } from '@ng-doc/app/components/theme-toggle';
import { NgDocRootComponent } from '@ng-doc/app/components/root';
import { NgDocSidebarComponent } from '@ng-doc/app/components/sidebar';
import { NG_DOC_ROUTING, provideNgDocContext } from '@ng-doc/generated';
import {
  RouterLink,
  RouterOutlet,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
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
import {
  NgDocButtonIconComponent,
  NgDocIconComponent,
  NgDocTooltipDirective,
} from '@ng-doc/ui-kit';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgDocRootComponent,
    NgDocNavbarComponent,
    RouterLink,
    NgDocThemeToggleComponent,
    NgDocButtonIconComponent,
    NgDocTooltipDirective,
    NgDocIconComponent,
    NgDocSidebarComponent,
    RouterOutlet,
  ],
  providers: [
    provideClientHydration(),
    provideNgDocContext(),
    provideNgDocApp(),
    provideSearchEngine(NgDocDefaultSearchEngine),
    providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
    provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS),
    provideMermaid(),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideRouter(
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
      withInMemoryScrolling(),
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
