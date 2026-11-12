import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { NavigationItemComponent } from './navigation-item.component';

export function provideNavigationItemComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      NavigationItemComponent,
    ]),
  ]);
}
