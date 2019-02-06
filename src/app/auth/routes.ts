import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OpenIdConnectLoginGuard } from './openid/openid-connect-login.guard';
import { OpenIdConnectVerifyGuard } from './openid/openid-connect-verify.guard';
import { OpenIdConnectVerifyComponent } from './openid/openid-connect-verify/openid-connect-verify.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [OpenIdConnectLoginGuard] },
  { path: 'openidconnect/verify', component: OpenIdConnectVerifyComponent, canActivate: [OpenIdConnectVerifyGuard] },
];
