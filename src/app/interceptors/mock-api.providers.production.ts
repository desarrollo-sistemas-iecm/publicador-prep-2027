import { Provider } from '@angular/core';

/**
 * El build de producción reemplaza `mock-api.providers.ts` por este archivo (angular.json,
 * `fileReplacements`), para que el interceptor y los datos ficticios no entren al bundle.
 */
export const MOCK_API_PROVIDERS: Provider[] = [];
