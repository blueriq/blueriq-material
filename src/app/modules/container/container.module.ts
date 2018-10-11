import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { ContainerComponent } from './container.component';
import { FailedComponent } from './failed/failed.component';
import { HorizontalFlexChildDirective } from './flex/horizontal-flex-child.directive';

const BLUERIQ_COMPONENTS = [
  ContainerComponent,
  FailedComponent
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS,
    HorizontalFlexChildDirective
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS),
    HorizontalFlexChildDirective
  ],
  imports: [
    SharedModule,
    CommonModule,
    BlueriqCommonModule,
    FlexLayoutModule,
    CommonModule,

    /* Material modules */
    MatIconModule,
    MatButtonModule
  ],
  exports: [BLUERIQ_COMPONENTS]
})
export class ContainerModule {
}
