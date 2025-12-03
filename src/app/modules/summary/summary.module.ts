import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { HeadingModule } from '../heading/heading.module';
import { SummaryComponent } from './summary.component';

const BQ_SUMMARY_COMPONENTS = [
  SummaryComponent,
];

@NgModule({
  declarations: [
    BQ_SUMMARY_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(BQ_SUMMARY_COMPONENTS),
  ],
  imports: [
    /* Basic */
    CommonModule,
    SharedModule,
    HeadingModule,

    /* Material modules */
    MatDividerModule,
    MatIconModule,
  ],
  exports: [BQ_SUMMARY_COMPONENTS],
})
export class SummaryModule {
}
