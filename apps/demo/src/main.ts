//import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// we only need this for localhost memlab support
//enableProdMode()

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  alert(JSON.stringify(err)),
);
