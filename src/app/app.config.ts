import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

import { OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ 
      eventCoalescing: true 
    }), 
    provideRouter(
      routes, 
      withComponentInputBinding()
    ),
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: OAuthStorage,
      useValue: localStorage
    }
  ]
};