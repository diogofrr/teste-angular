import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { InitService } from './services/init.service';
import { ProductService } from './services/product.service';

function initializeApp(initService: InitService, productService: ProductService): () => void {
  return () => {
    const existingProducts = productService.getProductsValue();
    if (existingProducts.length === 0) {
      initService.addSampleProducts();
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [InitService, ProductService],
      multi: true,
    },
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: false,
          cssLayer: false,
        },
      },
    }),
  ],
};
