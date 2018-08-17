import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../material.module';
import { BqErrorStateMatcher } from '../form-controls/bq-errorstatematcher';
import { FlowWidgetComponent } from './flow-widget.component';

const WIDGET_CONTROL_COMPONENTS = [
  FlowWidgetComponent
];

@NgModule({
  declarations: [
    WIDGET_CONTROL_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(WIDGET_CONTROL_COMPONENTS),
    { provide: ErrorStateMatcher, useClass: BqErrorStateMatcher }
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [WIDGET_CONTROL_COMPONENTS]
})

export class WidgetModule {
}
