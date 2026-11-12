import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BlueriqModule } from '@blueriq/angular';
import { V2BackendModule } from '@blueriq/angular/backend/v2';
import { DevtoolsModule } from '@blueriq/angular/devtools';
import { FormattingModule } from '@blueriq/angular/formatting';
import { BlueriqFormsModule } from '@blueriq/angular/forms';
import { LiveUpdatesModule } from '@blueriq/angular/live-updates';
import { OpenIdConnectAuthModule } from '@blueriq/angular/openidconnect';
import { BlueriqStoreModule } from '@blueriq/angular/store';
import { DateFormats } from '@blueriq/core';
import { OwlMomentDateTimeModule } from '@danielmoncada/angular-datetime-picker-moment-adapter';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideDateFormats } from '@shared/date/bq-date-parser';
import { provideBqEffects } from '@shared/effects/bq-effects.providers';
import { provideToastr } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideAssetComponents } from './modules/asset/asset.providers';
import { provideButtonComponents } from './modules/button/button.providers';
import { provideCommentComponents } from './modules/comment/comment.providers';
import { provideContainerComponents } from './modules/container/container.providers';
import { provideExternalFlowComponents } from './modules/container/external-flow/external-flow.providers';
import { provideContentItemComponents } from './modules/contentitem/contentitem.providers';
import { provideExpansionComponents } from './modules/expansion/expansion.providers';
import { provideFileComponents } from './modules/file/file.providers';
import { provideFormControlComponents } from './modules/form-controls/form-control.providers';
import { provideHeaderComponents } from './modules/header/header.providers';
import { provideImageComponents } from './modules/image/image.providers';
import { provideListComponents } from './modules/list/list.providers';
import { provideMenuComponents } from './modules/menu/menu.providers';
import { provideModalComponents } from './modules/modal/modal.providers';
import { provideNavigationItemComponents } from './modules/navigation/navigation-item/navigation-item.providers';
import { provideNavigationComponents } from './modules/navigation/navigation.providers';
import { providePageComponents } from './modules/page/page.providers';
import { provideReadonlyComponents } from './modules/readonly/readonly.providers';
import { provideSummaryComponents } from './modules/summary/summary.providers';
import { provideTabComponents } from './modules/tab/tabs.providers';
import { provideTextItemComponents } from './modules/textitem/textitem.providers';
import { provideTimelineComponents } from './modules/timeline/timeline.providers';
import { provideVisualizationComponents } from './modules/visualization/visualization.providers';
import { provideWidgetComponents } from './modules/widget/widget.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    // NgRx
    importProvidersFrom(StoreModule.forRoot({}), EffectsModule.forRoot([])),
    provideStoreDevtools({
      name: 'Blueriq',
      logOnly: environment.production, // Restrict extension to log-only mode
      connectInZone: true,
    }),
    provideToastr({
      autoDismiss: true,
      maxOpened: 5,
      preventDuplicates: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true,
      positionClass: 'toast-bottom-right',
      timeOut: 7500,
    }),

    /* Blueriq */
    importProvidersFrom(
      BlueriqModule.forRoot({
        isBundled: environment.isBundled,
      }),
      BlueriqStoreModule.forRoot(),
      BlueriqFormsModule.forRoot(),
      FormattingModule.forRoot(),
      V2BackendModule.forRoot({
        baseUrl: environment.baseUrl,
      }),
      DevtoolsModule.forRoot({
        devtoolsUrl: environment.devtoolsUrl,
        runtimeUrl: environment.baseUrl,
        targetOrigin: '*',
      }),

      // Remove this module declaration if your setup doesn't include Blueriq's LiveUpdates feature
      LiveUpdatesModule.forRoot({
        baseUrl: environment.eventBusBaseUrl,
        giveUpAfterNrOfAttempts: 5,
      }),

      OpenIdConnectAuthModule,
      OwlMomentDateTimeModule,
    ),
    { provide: DateFormats, useFactory: provideDateFormats },

    /* Blueriq Theme */
    provideBqEffects(),
    provideAssetComponents(),
    provideButtonComponents(),
    provideCommentComponents(),
    provideContainerComponents(),
    provideExternalFlowComponents(),
    provideContentItemComponents(),
    provideExpansionComponents(),
    provideFileComponents(),
    provideFormControlComponents(),
    provideHeaderComponents(),
    provideImageComponents(),
    provideListComponents(),
    provideMenuComponents(),
    provideModalComponents(),
    provideNavigationComponents(),
    provideNavigationItemComponents(),
    providePageComponents(),
    provideReadonlyComponents(),
    provideSummaryComponents(),
    provideTabComponents(),
    provideTextItemComponents(),
    provideTimelineComponents(),
    provideVisualizationComponents(),
    provideWidgetComponents(),
  ],
};
