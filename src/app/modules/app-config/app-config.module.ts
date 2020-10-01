import { InjectionToken, NgModule } from '@angular/core';
import { AppConfig } from './domain/app-config';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_DI_CONFIG: AppConfig = {
  backendUrl: 'http://127.0.0.1:5000/api/v1',
};

@NgModule({
  providers: [
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG,
    },
  ],
})
export class AppConfigModule {}
