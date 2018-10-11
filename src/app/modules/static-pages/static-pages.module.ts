import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';

const STATIC_PAGES_COMPONENTS = [
  LoginComponent
];

@NgModule({
  declarations: [
    STATIC_PAGES_COMPONENTS
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,

    /* Material modules */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [STATIC_PAGES_COMPONENTS]
})

export class StaticPagesModule {
}
