import { NgModule } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { AssetComponent } from './asset.component';

const BLUERIQ_COMPONENTS = [
  AssetComponent,
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS),
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class AssetModule {
}
