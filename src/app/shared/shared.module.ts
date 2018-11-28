import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BqKeyDirective } from '@shared/directive/bq-key/bq-key.directive';
import { BqContainerDirective } from '@shared/directive/container/bq-container.directive';
import { BqIconDirective } from '@shared/directive/icon/icon.directive';

const SHARED_COMPONENTS = [
  BqKeyDirective,
  BqIconDirective,
  BqContainerDirective,
];

@NgModule({
  declarations: [
    SHARED_COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    SHARED_COMPONENTS, CommonModule, FormsModule,
  ],
})
export class SharedModule {
}
