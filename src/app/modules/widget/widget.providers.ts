import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { FlowWidgetComponent } from './flow-widget/flow-widget.component';

export function provideWidgetComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      FlowWidgetComponent,
    ]),
  ]);
}
