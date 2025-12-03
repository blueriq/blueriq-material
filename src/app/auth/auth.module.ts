import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
