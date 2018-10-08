import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { TabComponent } from './tab.component';

const BLUERIQ_COMPONENTS = [
  TabComponent
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS)
  ],
  imports: [
    BlueriqCommonModule, // using: [bqElement] directive
    BrowserAnimationsModule,
    CommonModule,

    /* Material modules */
    MatTabsModule,
    MatIconModule
  ],
  exports: [BLUERIQ_COMPONENTS]
})
export class TabModule {
}
