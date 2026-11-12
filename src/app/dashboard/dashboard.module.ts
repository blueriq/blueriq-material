import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlueriqCommonModule } from '@blueriq/angular';
import { BlueriqDashboardModule, DashboardV2BackendModule } from '@blueriq/dashboard';
import { environment } from '../../environments/environment';
import { DashboardComponent } from './dashboard.component';
import { DashboardPageComponent } from './page/dashboard-page.component';
import { FlowWidgetComponent } from './widgets/flow-widget/flow-widget.component';
import { IntakeWidgetComponent } from './widgets/intake-widget/intake-widget.component';
import { TaskExecutionWidgetComponent } from './widgets/task-execution-widget/task-execution-widget.component';

export const ROUTES: Routes = [
  {
    path: `shortcut/:shortcut`,
    component: DashboardComponent,
  },
  {
    path: `shortcut/:shortcut/:page`,
    component: DashboardComponent,
  },
  {
    path: `:project/:version/:dashboard/:page`,
    component: DashboardComponent,
  },
];

@NgModule({
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
    DashboardComponent,
    DashboardPageComponent,
    FlowWidgetComponent,
    TaskExecutionWidgetComponent,
    IntakeWidgetComponent,
  ],
})
export class DashboardModule {
}
