import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BlueriqModule } from '@blueriq/angular';
import { V2BackendModule } from '@blueriq/angular/backend/v2';
import { DevtoolsModule } from '@blueriq/angular/devtools';
import { LiveUpdatesModule } from '@blueriq/angular/live-updates';
import { BlueriqStoreModule } from '@blueriq/angular/store';
import { DateFormats } from '@blueriq/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideDateFormats } from '@shared/date/bq-date-parser';
import { BqEffectsModule } from '@shared/effects/bq-effects.module';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AUTH_ROUTES } from './auth/routes';
import { AssetModule } from './modules/asset/asset.module';
import { ButtonModule } from './modules/button/button.module';
import { CommentModule } from './modules/comment/comment.module';
import { ContainerModule } from './modules/container/container.module';
import { ContentItemModule } from './modules/contentitem/contentitem.module';
import { ExpansionModule } from './modules/expansion/expansion.module';
import { FileModule } from './modules/file/file.modules';
import { FormControlModule } from './modules/form-controls/form-control.module';
import { HeaderModule } from './modules/header/header.module';
import { ImageModule } from './modules/image/image.module';
import { ListModule } from './modules/list/list.module';
import { LoadingModule } from './modules/loading/loading.module';
import { MenuModule } from './modules/menu/menu.module';
import { ModalModule } from './modules/modal/modal.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { PageModule } from './modules/page/page.module';
import { ReadonlyModule } from './modules/readonly/readonly.module';
import { SummaryModule } from './modules/summary/summary.module';
import { TabModule } from './modules/tab/tabs.module';
import { TextItemModule } from './modules/textitem/textitem.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { VisualizationModule } from './modules/visualization/visualization.module';
import { WidgetModule } from './modules/widget/widget.module';
import { NotificationOverlayModule } from './notification-overlay/notification-overlay.module';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
  },
  { path: 'session/:sessionId', component: ProjectComponent },
  { path: 'shortcut/:shortcut', component: ProjectComponent },
  { path: 'flow/:project/:flow', component: ProjectComponent },
  { path: 'flow/:project/:flow/:version', component: ProjectComponent },
  { path: 'flow/:project/:flow/:version/:languageCode', component: ProjectComponent },
  ...AUTH_ROUTES,
  { path: '**', redirectTo: 'shortcut/default', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // NgRx
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Blueriq',
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ToastrModule.forRoot({
      autoDismiss: true,
      positionClass: 'toast-bottom-right',
      timeOut: 7500,
    }),

    /* Blueriq */
    BlueriqModule.forRoot({
      isBundled: environment.isBundled,
    }),
    BlueriqStoreModule.forRoot(),
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

    /* Blueriq Theme Modules */
    AssetModule,
    BqEffectsModule,
    ButtonModule,
    CommentModule,
    ContainerModule,
    ContentItemModule,
    ExpansionModule,
    FileModule,
    FormControlModule,
    HeaderModule,
    ImageModule,
    ListModule,
    MenuModule,
    ModalModule,
    NavigationModule,
    PageModule,
    ReadonlyModule,
    SummaryModule,
    TabModule,
    TextItemModule,
    TimelineModule,
    VisualizationModule,
    WidgetModule,

    /* Non-Blueriq modules */
    LoadingModule,
    AuthModule,
    NotificationOverlayModule,
  ],
  providers: [
    { provide: DateFormats, useFactory: provideDateFormats },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
