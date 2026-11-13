import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { BlueriqDashboardModule, DashboardV2BackendModule } from '@blueriq/dashboard';
import { environment } from '../../environments/environment';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    providers: [
      importProvidersFrom(
        BlueriqDashboardModule.forRoot({
          baseUrl: environment.dashboardUrl,
          authBaseUrl: environment.dashboardAuthUrl,
        }),
        DashboardV2BackendModule.forRoot(),
      ),
    ],
    children: [
      { path: 'shortcut/:shortcut', component: DashboardComponent },
      { path: 'shortcut/:shortcut/:page', component: DashboardComponent },
      { path: ':project/:version/:dashboard/:page', component: DashboardComponent },
    ],
  },
];
