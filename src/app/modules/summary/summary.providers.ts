import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { SummaryComponent } from './summary.component';

export function provideSummaryComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      SummaryComponent,
    ]),
  ]);
}
