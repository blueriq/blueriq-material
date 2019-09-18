import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BlueriqCommonModule, BlueriqComponents, BlueriqStyles } from '@blueriq/angular';
import { TextItemModule as BlueriqTextItemModule } from '@blueriq/angular/textitems';
import { TextItem } from '@blueriq/core';
import { SharedModule } from '@shared/shared.module';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { TextItemComponent } from './textitem.component';

const BLUERIQ_COMPONENTS = [
  TextItemComponent,
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS),
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
  ],
  imports: [
    CommonModule,
    BlueriqTextItemModule,
    SharedModule,

    BlueriqCommonModule,

    /* Material modules */
    MatIconModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class TextItemModule {
}
