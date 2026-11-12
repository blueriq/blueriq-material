import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { ButtonComponent } from './button.component';
import { ButtonIconComponent } from './icon/button.icon.component';

export function provideButtonComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      ButtonComponent,
      ButtonIconComponent,
    ]),
  ]);
}
