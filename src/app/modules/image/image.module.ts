import { NgModule } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { ImageComponent } from './image.component';

const BLUERIQ_COMPONENTS = [
  ImageComponent
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS)
  ],
  exports: [BLUERIQ_COMPONENTS]
})
export class ImageModule {
}
