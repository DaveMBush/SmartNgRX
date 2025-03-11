// eslint-disable-next-line sonarjs/no-commented-code -- see below
//import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// we only need this for localhost dev tools support
// eslint-disable-next-line sonarjs/no-commented-code -- see above
//enableProdMode()

function catchError(err: unknown): void {
  alert(JSON.stringify(err));
}

bootstrapApplication(AppComponent, appConfig).catch(catchError);
