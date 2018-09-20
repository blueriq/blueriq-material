import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { TabComponent } from './tab.component';

const TAB_COMPONENTS = [
  TabComponent
];

@NgModule({
  declarations: [
    TAB_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(TAB_COMPONENTS)
  ],
  imports: [
    BlueriqCommonModule,
    BrowserAnimationsModule,
    CommonModule,
    MatTabsModule
  ],
  exports: [TAB_COMPONENTS]
})

export class TabModule {

}
