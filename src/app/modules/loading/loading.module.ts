import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading.component';

const LOADING_COMPONENTS = [
  LoadingComponent,
];

@NgModule({
  declarations: [
    LOADING_COMPONENTS,
  ],
  imports: [
    CommonModule,
  ],
  exports: [LOADING_COMPONENTS],
})
export class LoadingModule {
}
