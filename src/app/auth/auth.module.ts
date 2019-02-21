import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { OpenIdConnectAuthModule } from '@blueriq/angular/openidconnect';
import { NotificationOverlayModule } from '../notification-overlay/notification-overlay.module';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { LoginComponent } from './login/login.component';
import { OpenIdConnectVerifyComponent } from './openid/openid-connect-verify/openid-connect-verify.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoggedOutComponent,
    OpenIdConnectVerifyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    OpenIdConnectAuthModule,

    /* Theme modules */
    NotificationOverlayModule,

    /* Material modules */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
})

export class AuthModule {
}
