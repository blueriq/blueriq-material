import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { HeadingModule } from '../../heading/heading.module';
import { ExternalFlowPageComponent } from './external-flow-page/external-flow-page.component';
import { ExternalFlowComponent } from './external-flow.component';

const EXTERNALFLOW_CONTROL_COMPONENTS = [
  ExternalFlowComponent,
];

@NgModule({
  declarations: [
    EXTERNALFLOW_CONTROL_COMPONENTS,
    ExternalFlowPageComponent,
  ],
  providers: [
    BlueriqComponents.register(EXTERNALFLOW_CONTROL_COMPONENTS),
  ],
  imports: [
    BlueriqCommonModule, // using: bq-session
    CommonModule,
    SharedModule,
    HeadingModule,

    /* Material modules */
    MatIconModule,
    MatInputModule,
  ],
  exports: [EXTERNALFLOW_CONTROL_COMPONENTS],
})
export class ExternalFlowModule {
}
