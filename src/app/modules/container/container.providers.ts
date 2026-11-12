import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { ContainerComponent } from './container.component';
import { ContainerEmptyComponent } from './empty/container.empty.component';
import { ContainerFailedComponent } from './failed/container.failed.component';
import { HorizontalFlexChildDirective } from './flex/horizontal-flex-child.directive';

export function provideContainerComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      ContainerComponent,
      ContainerEmptyComponent,
      ContainerFailedComponent,
    ]),
    HorizontalFlexChildDirective,
  ]);
}
