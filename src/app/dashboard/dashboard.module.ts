import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlueriqCommonModule } from '@blueriq/angular';
import { DashboardBackendModule } from '@blueriq/dashboard';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../../environments/environment';
import { FooterModule } from '../modules/footer/footer.module';
import { LoadingModule } from '../modules/loading/loading.module';
import { NotificationOverlayModule } from '../notification-overlay/notification-overlay.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardEffects } from './events/effects';
import { DashboardHeaderModule } from './header/dashboard-header.module';
import { DashboardPageComponent } from './page/dashboard-page.component';
import { DashboardResolver } from './resolvers/dashboard.resolver';
import { PageResolver } from './resolvers/page.resolver';
import { DASHBOARD_ID, DASHBOARD_PAGE_ID } from './routing/route-fragments';
import { FlowWidgetComponent } from './widgets/flow-widget/flow-widget.component';
import { TaskExecutionWidgetComponent } from './widgets/task-execution-widget/task-execution-widget.component';

export const ROUTES: Routes = [
  {
    path: `:${DASHBOARD_ID}`,
    resolve: { dashboard: DashboardResolver },
    component: DashboardComponent,
    children: [
      {
        path: `:${DASHBOARD_PAGE_ID}`,
        component: DashboardPageComponent,
        resolve: { page: PageResolver },
      },
      {
        path: '',
        component: DashboardPageComponent,
        resolve: { page: PageResolver },
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardPageComponent,
    FlowWidgetComponent,
    TaskExecutionWidgetComponent,
  ],
  imports: [
    // Angular Modules
    CommonModule,
    RouterModule.forChild(ROUTES),

    // Dashboard Modules
    DashboardBackendModule.forRoot({
      baseUrl: environment.dashboardUrl,
      authBaseUrl: environment.dashboardAuthUrl,
    }),
    EffectsModule.forFeature([DashboardEffects]),

    // Blueriq Modules
    BlueriqCommonModule,
    NotificationOverlayModule,
    DashboardHeaderModule,
    FooterModule,
    LoadingModule,
  ],
  providers: [
    DashboardResolver,
    PageResolver,
  ],
})
export class DashboardModule {
}
