import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatInputModule } from '@angular/material';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { FlowWidgetComponent } from './flow-widget/flow-widget.component';

const WIDGET_CONTROL_COMPONENTS = [
  FlowWidgetComponent
];

@NgModule({
  declarations: [
    WIDGET_CONTROL_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(WIDGET_CONTROL_COMPONENTS)
  ],
  imports: [
    BlueriqCommonModule, // using: bq-session
    CommonModule,
    FlexLayoutModule,

    /* Material modules */
    MatIconModule,
    MatInputModule
  ],
  exports: [WIDGET_CONTROL_COMPONENTS]
})
export class WidgetModule {
}
