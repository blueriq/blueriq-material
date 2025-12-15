import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { HeadingModule } from '../heading/heading.module';
import { ContainerComponent } from './container.component';
import { ContainerEmptyComponent } from './empty/container.empty.component';
import { ExternalFlowModule } from './external-flow/external-flow.module';
import { ContainerFailedComponent } from './failed/container.failed.component';
import { FlexColumnDirective } from './flex/flex-column.directive';
import { HorizontalFlexChildDirective } from './flex/horizontal-flex-child.directive';


const BLUERIQ_COMPONENTS = [
  ContainerComponent,
  ContainerEmptyComponent,
  ContainerFailedComponent,
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS,
    HorizontalFlexChildDirective,
    FlexColumnDirective,
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS),
    HorizontalFlexChildDirective,
  ],
  imports: [
    SharedModule,
    CommonModule,
    BlueriqCommonModule,
    HeadingModule,
    ExternalFlowModule,

    /* Material modules */
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class ContainerModule {
}
