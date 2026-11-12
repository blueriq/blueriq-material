import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents, BlueriqStyles } from '@blueriq/angular';
import { TextItem } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { TextItemComponent } from './textitem.component';

export function provideTextItemComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      TextItemComponent,
    ]),
    BlueriqStyles.mapping([
      {
        from: BqPresentationStyles.TEXTEMPHASIS,
        to: 'emphasis',
        when: { type: TextItem },
      },
      {
        from: BqPresentationStyles.TEXTEMPHASIS_SUBTLE,
        to: 'subtle',
        when: { type: TextItem },
      },
      {
        from: BqPresentationStyles.TEXTEMPHASIS_INTENSE,
        to: 'intense',
        when: { type: TextItem },
      },
    ]),
  ]);
}
