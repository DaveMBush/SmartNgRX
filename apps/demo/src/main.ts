//import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// we only need this for localhost dev tools support
//enableProdMode()

function catchError(err: unknown): void {
  alert(JSON.stringify(err));
}

bootstrapApplication(AppComponent, appConfig).catch(catchError);
