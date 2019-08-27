import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { HeaderModule } from '../header/header.module';
import { PageComponent } from './page.component';

const BLUERIQ_COMPONENTS = [
  PageComponent,
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
    BlueriqCommonModule,

    /* Blueriq modules */
    HeaderModule,

    /* Material modules */
    MatDividerModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class PageModule {
}
