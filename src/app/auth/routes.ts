import { Routes } from '@angular/router';
import { JwtLoginGuard } from './jwt/jwt-login.guard';
import { OpenIdConnectLoginGuard } from './openid/openid-connect-login.guard';
import { OpenIdConnectVerifyGuard } from './openid/openid-connect-verify.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent),
    canActivate: [OpenIdConnectLoginGuard, JwtLoginGuard],
  },
  {
    path: 'logged-out',
    loadComponent: () => import('./logged-out/logged-out.component').then(mod => mod.LoggedOutComponent),
  },
  {
    path: 'openidconnect/verify',
    loadComponent: () => import('./openid/openid-connect-verify/openid-connect-verify.component')
      .then(mod => mod.OpenIdConnectVerifyComponent),
    canActivate: [OpenIdConnectVerifyGuard],
  },
];
