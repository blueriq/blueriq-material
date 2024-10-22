import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlueriqCommonModule } from '@blueriq/angular';
import { BlueriqDashboardModule, DashboardV2BackendModule } from '@blueriq/dashboard';
import { environment } from '../../environments/environment';
import { FooterModule } from '../modules/footer/footer.module';
import { LoadingModule } from '../modules/loading/loading.module';
import { NotificationOverlayModule } from '../notification-overlay/notification-overlay.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardHeaderModule } from './header/dashboard-header.module';
import { DashboardPageComponent } from './page/dashboard-page.component';
import { FlowWidgetComponent } from './widgets/flow-widget/flow-widget.component';
import { TaskExecutionWidgetComponent } from './widgets/task-execution-widget/task-execution-widget.component';

export const ROUTES: Routes = [
  {
    path: `:project/:version/:dashboard/:page`,
    component: DashboardComponent
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
    BlueriqDashboardModule.forRoot({
      baseUrl: environment.dashboardUrl,
      authBaseUrl: environment.dashboardAuthUrl,
    }),
    DashboardV2BackendModule.forRoot(),
    // Blueriq Modules
    BlueriqCommonModule,
    NotificationOverlayModule,
    DashboardHeaderModule,
    FooterModule,
    LoadingModule,
  ],
})
export class DashboardModule {
}
