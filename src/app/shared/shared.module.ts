import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { BqKeyDirective } from '@shared/bq-key/bq-key.directive';
import { ValidationEffect } from '@shared/effects/validation/validation.effect';
import { MaterialModule } from '../material.module';

const SHARED_COMPONENTS = [
  BqKeyDirective
];

@NgModule({
  declarations: [
    SHARED_COMPONENTS
  ],
  imports: [
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
