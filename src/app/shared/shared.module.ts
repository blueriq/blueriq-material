import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { BqKeyDirective } from '@shared/directive/bq-key/bq-key.directive';
import { HorizontalFlexChildDirective } from '@shared/directive/flex/horizontal-flex-child.directive';
import { ValidationEffect } from '@shared/effects/validation/validation.effect';
import { MaterialModule } from '../material.module';

const SHARED_COMPONENTS = [
  BqKeyDirective,
  HorizontalFlexChildDirective
];

@NgModule({
  declarations: [
    SHARED_COMPONENTS
  ],
  imports: [
    // TODO remove what is not needed for this module to work
    BrowserModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    EffectsModule.forFeature([
      ValidationEffect
    ])
  ],
  exports: [
    SHARED_COMPONENTS
  ]
})
export class SharedModule {
}
