import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
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

    BlueriqModule.forRoot(), // using bqClasses (which triggers to use the css to use colors)
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class ContentItemModule {
}
