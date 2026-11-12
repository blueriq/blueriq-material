import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth/routes';
import { ProjectComponent } from './project.component';

export const routes: Routes = [
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
