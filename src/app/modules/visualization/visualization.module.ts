import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { StatisticComponent } from './statistic/statistic.component';

const BQ_VISUALIZATION_COMPONENTS = [
  StatisticComponent
];

@NgModule({
  declarations: [
    BQ_VISUALIZATION_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(BQ_VISUALIZATION_COMPONENTS)
  ],
  imports: [
    /* Basic */
    CommonModule,
    BlueriqCommonModule
  ],
  exports: [BQ_VISUALIZATION_COMPONENTS]
})
export class VisualizationModule {

}
