import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ErrorModule } from '../error/error.module';
import { LoginComponent } from './login.component';
import { OpenIdConnectVerifyComponent } from './openid-connect-verify/openid-connect-verify.component';

@NgModule({
  declarations: [
    LoginComponent,
    OpenIdConnectVerifyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,

    /* Theme modules */
    ErrorModule,

    /* Material modules */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
})

export class StaticPagesModule {
}
