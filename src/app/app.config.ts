import { ApplicationConfig,importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withFetch()), provideAnimations(),provideToastr(),importProvidersFrom(
      BrowserAnimationsModule,ToastrModule.forRoot()    
    ), MatDialogModule
  ]};