import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { HeadingModule } from '../heading/heading.module';
import { ContainerComponent } from './container.component';
import { ContainerEmptyComponent } from './empty/container.empty.component';
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
    FlexLayoutModule,

    /* Material modules */
    MatIconModule,
    MatButtonModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class ContainerModule {
}
