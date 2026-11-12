import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { TimelineComponent } from './timeline.component';

export function provideTimelineComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      TimelineComponent,
    ]),
  ]);
}
