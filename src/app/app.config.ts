import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideFirestore, getFirestore as getFirestore_alias, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp as initializeApp_alias, initializeApp } from '@angular/fire/app';
/* import { FIREBASE_OPTIONS } from '@angular/fire/compat'; */
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(),
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideFirestore(() => getFirestore()),
    /*  { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig } */
  ],
};