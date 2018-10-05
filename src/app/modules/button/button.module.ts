import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { BlueriqComponents } from '@blueriq/angular';
import { ButtonComponent } from './button.component';

const BLUERIQ_COMPONENTS = [
  ButtonComponent
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS)
  ],
  imports: [
    /* Material modules */
    MatButtonModule
  ],
  exports: [BLUERIQ_COMPONENTS]
})
export class ButtonModule {
}
