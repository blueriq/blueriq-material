import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { HeaderComponent } from './header.component';

export function provideHeaderComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      HeaderComponent,
    ]),
  ]);
}
