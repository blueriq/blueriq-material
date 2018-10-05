import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { V1BackendModule } from '@blueriq/angular/backend/v1';
import { FormattingModule } from '@blueriq/angular/formatting';
import { BlueriqFormsModule } from '@blueriq/angular/forms';
import { BlueriqStoreModule } from '@blueriq/angular/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ValidationEffect } from '@shared/effects/validation/validation.effect';
import { SharedModule } from '@shared/shared.module';
import { environment } from '../../../environments/environment';
import { MaterialModule } from '../../material.module';
import { ContainerComponent } from './container.component';

const BLUERIQ_COMPONENTS = [
  ContainerComponent
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS)
  ],
  imports: [
    SharedModule,
    BrowserModule,
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BlueriqModule.forRoot(),
    V1BackendModule.forRoot({
      baseUrl: environment.baseUrl
    }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    BlueriqFormsModule.forRoot(),
    FlexLayoutModule,
    FormattingModule.forRoot(),
    ReactiveFormsModule,
    BlueriqStoreModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Blueriq',
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    EffectsModule.forFeature([
      ValidationEffect
    ])
  ],
  exports: [BLUERIQ_COMPONENTS]
})
export class ContainerModule {
}
