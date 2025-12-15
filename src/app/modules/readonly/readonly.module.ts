import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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

    /* Material modules */
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class ReadonlyModule {
}
