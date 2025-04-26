import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { defineCustomElements } from 'stripe-pwa-elements/loader';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if(environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => defineCustomElements(window))
  .catch(err => console.log(err));
