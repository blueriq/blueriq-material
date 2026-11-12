import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { ExpansionComponent } from './expansion.component';

export function provideExpansionComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      ExpansionComponent,
    ]),
  ]);
}
