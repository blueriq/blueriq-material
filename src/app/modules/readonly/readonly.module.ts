import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BlueriqComponents } from '@blueriq/angular';
import { FormattingModule } from '@blueriq/angular/formatting';
import { SharedModule } from '@shared/shared.module';
import { ReadonlyComponent } from './readonly.component';

const BLUERIQ_COMPONENTS = [
  ReadonlyComponent,
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS),
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormattingModule.forRoot(), // for pipe 'bqDisplay'
    FlexLayoutModule,

    /* Material modules */
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class ReadonlyModule {
}
