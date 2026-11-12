import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { NavigationComponent } from './navigation.component';

export function provideNavigationComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      NavigationComponent,
    ]),
  ]);
}
