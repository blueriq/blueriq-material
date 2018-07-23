import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BqKeyDirective } from '@shared/bq-key/bq-key.directive';
import { MaterialModule } from '../material.module';
import { FieldContainerComponent } from './field-container/field-container.component';

const SHARED_COMPONENTS = [
  BqKeyDirective,
  FieldContainerComponent
];

@NgModule({
  declarations: [
    SHARED_COMPONENTS
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    SHARED_COMPONENTS
  ]
})
export class SharedModule {
}
