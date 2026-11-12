import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { ExternalFlowComponent } from './external-flow.component';

export function provideExternalFlowComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      ExternalFlowComponent,
    ]),
  ]);
}
