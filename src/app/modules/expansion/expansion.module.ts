import { NgModule } from '@angular/core';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { ExpansionComponent } from './expansion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContainerModule } from '../container/container.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';


const BLUERIQ_COMPONENTS = [
  ExpansionComponent,
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS),
  ],
  imports: [
    MatExpansionModule,
    BlueriqCommonModule,
    ContainerModule,
    CommonModule,
    SharedModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class ExpansionModule {
}
