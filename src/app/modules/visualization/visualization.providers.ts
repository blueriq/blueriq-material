import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { StatisticComponent } from './statistic/statistic.component';

export function provideVisualizationComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      StatisticComponent,
    ]),
  ]);
}
