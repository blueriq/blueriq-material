import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { ContentItemComponent } from './contentitem.component';

export function provideContentItemComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      ContentItemComponent,
    ]),
  ]);
}
