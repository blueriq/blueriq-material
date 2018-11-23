import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { ErrorComponent } from './error.component';

const ERROR_COMPONENTS = [
  ErrorComponent,
];

@NgModule({
  declarations: [
    ERROR_COMPONENTS,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  exports: [ERROR_COMPONENTS],
})
export class ErrorModule {
}
