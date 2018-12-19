import { NgModule } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { ImageComponent } from './image.component';

const BLUERIQ_COMPONENTS = [
  ImageComponent,
];

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    BLUERIQ_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS),
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class ImageModule {
}
