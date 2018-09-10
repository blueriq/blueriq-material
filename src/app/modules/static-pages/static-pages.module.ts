import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqModule } from '@blueriq/angular';
import { MaterialModule } from '../../material.module';
import { LoginComponent } from './login.component';

const STATIC_PAGES_COMPONENTS = [
  LoginComponent
];

@NgModule({
  declarations: [
    STATIC_PAGES_COMPONENTS
  ],
  imports: [
    // TODO check these modules
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    BlueriqModule.forRoot(),
    FlexLayoutModule, // x
    FormsModule, // +

    /* Material modules TODO */
    MaterialModule
  ],
  exports: [STATIC_PAGES_COMPONENTS]
})

export class StaticPagesModule {
}
