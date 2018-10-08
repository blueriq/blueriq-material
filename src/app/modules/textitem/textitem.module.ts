import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { TextItemModule as BlueriqTextItemModule } from '@blueriq/angular/textitems';
import { SharedModule } from '@shared/shared.module';
import { TextItemComponent } from './textitem.component';

const BLUERIQ_COMPONENTS = [
  TextItemComponent
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS)
  ],
  imports: [
    CommonModule,
    BlueriqModule.forRoot(),
    BlueriqTextItemModule,
    SharedModule,

    /* Material modules */
    MatIconModule
  ],
  exports: [BLUERIQ_COMPONENTS]
})
export class TextItemModule {
}
