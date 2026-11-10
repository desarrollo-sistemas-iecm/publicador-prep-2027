import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockApiInterceptor } from './mock-api.interceptor';

export const MOCK_API_PROVIDERS: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true }
];
