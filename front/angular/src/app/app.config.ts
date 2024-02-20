import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loggerInterceptor } from './interceptors/logger/logger.interceptor';
import { headersInterceptor } from './interceptors/headers/headers.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { cartReducer } from './store/cart/cart.reducer';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient(withFetch(), withInterceptors([loggerInterceptor, headersInterceptor])), provideStore(), provideState('cart', cartReducer)]
};
