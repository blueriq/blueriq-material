import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { HeadingModule } from '../heading/heading.module';
import { StatisticComponent } from './statistic/statistic.component';

const BQ_VISUALIZATION_COMPONENTS = [
  StatisticComponent,
];

@NgModule({
  declarations: [
    BQ_VISUALIZATION_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(BQ_VISUALIZATION_COMPONENTS),
  ],
  imports: [
    /* Basic */
    CommonModule,
    SharedModule,
    HeadingModule,
  ],
  exports: [BQ_VISUALIZATION_COMPONENTS],
})
export class VisualizationModule {
}
