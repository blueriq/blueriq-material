import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { ContentItemComponent } from './contentitem.component';

const BLUERIQ_COMPONENTS = [
  ContentItemComponent,
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

    BlueriqCommonModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class ContentItemModule {
}
