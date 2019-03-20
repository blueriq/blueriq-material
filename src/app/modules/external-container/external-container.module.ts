import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatInputModule } from '@angular/material';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { HeadingModule } from '../heading/heading.module';
import { ExternalContainerComponent } from './external-container.component';

const EXTERNAL_CONTAINER_CONTROL_COMPONENTS = [
  ExternalContainerComponent,
];

@NgModule({
  declarations: [
    EXTERNAL_CONTAINER_CONTROL_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(EXTERNAL_CONTAINER_CONTROL_COMPONENTS),
  ],
  imports: [
    BlueriqCommonModule, // using: bq-session
    CommonModule,
    SharedModule,
    HeadingModule,
    FlexLayoutModule,

    /* Material modules */
    MatIconModule,
    MatInputModule,
  ],
  exports: [EXTERNAL_CONTAINER_CONTROL_COMPONENTS],
})
export class ExternalContainerModule {
}
