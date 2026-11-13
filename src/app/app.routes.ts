import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth/routes';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
  },
  { path: 'session/:sessionId', loadComponent: loadProjectComponent },
  { path: 'shortcut/:shortcut', loadComponent: loadProjectComponent },
  { path: 'flow/:project/:flow', loadComponent: loadProjectComponent },
  { path: 'flow/:project/:flow/:version', loadComponent: loadProjectComponent },
  { path: 'flow/:project/:flow/:version/:languageCode', loadComponent: loadProjectComponent },
  ...AUTH_ROUTES,
  { path: '**', redirectTo: 'shortcut/default', pathMatch: 'full' },
];

function loadProjectComponent() {
  return import('./project.component').then(mod => mod.ProjectComponent);
}
