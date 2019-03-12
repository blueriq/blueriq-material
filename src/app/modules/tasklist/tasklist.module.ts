import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import { BlueriqComponents, BlueriqModule, BlueriqStyles } from '@blueriq/angular';
import { TextItem } from '@blueriq/core';
import { SharedModule } from '@shared/shared.module';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { TasklistComponent } from './tasklist.component';

const BLUERIQ_COMPONENTS = [
  TasklistComponent,
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
    SharedModule,

    BlueriqModule.forRoot(), // using bqClasses (which triggers to use the css to use colors)

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    HttpClientModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class TasklistModule {
}
