import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { FooterModule } from '../footer/footer.module';
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
    FooterModule,

    /* Material modules */
    MatDividerModule,
    FlexModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class PageModule {
}
