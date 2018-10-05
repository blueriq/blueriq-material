import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { FormattingModule } from '@blueriq/angular/formatting';
import { SharedModule } from '@shared/shared.module';
import { ReadonlyComponent } from './readonly.component';

const BLUERIQ_COMPONENTS = [
  ReadonlyComponent
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
    BlueriqModule.forRoot(),
    FormattingModule.forRoot(), // for pipe 'bqDisplay'

    /* Material modules */
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [BLUERIQ_COMPONENTS]
})
export class ReadonlyModule {
}
