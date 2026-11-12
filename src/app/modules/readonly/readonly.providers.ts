import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { ReadonlyComponent } from './readonly.component';

export function provideReadonlyComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      ReadonlyComponent,
    ]),
  ]);
}
