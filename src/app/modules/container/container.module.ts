import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { ContainerComponent } from './container.component';
import { HorizontalFlexChildDirective } from './flex/horizontal-flex-child.directive';

const BLUERIQ_COMPONENTS = [
  ContainerComponent,
  HorizontalFlexChildDirective
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
    BlueriqCommonModule,
    CommonModule,

    /* Material modules */
    MatIconModule
  ],
  exports: [BLUERIQ_COMPONENTS]
})
export class ContainerModule {
}
