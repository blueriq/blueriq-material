import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { AssetComponent } from './asset.component';

export function provideAssetComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      AssetComponent,
    ]),
  ]);
}
