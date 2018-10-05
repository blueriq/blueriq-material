import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { HeaderModule } from '../header/header.module';
import { PageComponent } from './page.component';

const BLUERIQ_COMPONENTS = [
  PageComponent
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS)
  ],
  imports: [
    BrowserModule,
    BlueriqModule.forRoot(),

    /* Blueriq modules */
    HeaderModule,

    /* Material modules */
    MatDividerModule
  ],
  exports: [BLUERIQ_COMPONENTS]
})
export class PageModule {
}
