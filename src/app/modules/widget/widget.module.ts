import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { HeadingModule } from '../heading/heading.module';
import { FlowWidgetComponent } from './flow-widget/flow-widget.component';
import { WidgetPageComponent } from './widget-page/widget-page.component';

const WIDGET_CONTROL_COMPONENTS = [
  FlowWidgetComponent,
];

@NgModule({
  declarations: [
    WIDGET_CONTROL_COMPONENTS,
    WidgetPageComponent,
  ],
  providers: [
    BlueriqComponents.register(WIDGET_CONTROL_COMPONENTS),
  ],
  imports: [
    BlueriqCommonModule, // using: bq-session
    CommonModule,
    SharedModule,
    HeadingModule,

    /* Material modules */
    MatIconModule,
    MatInputModule,
  ],
  exports: [WIDGET_CONTROL_COMPONENTS],
})
export class WidgetModule {
}
