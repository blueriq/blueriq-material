import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
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
    SharedModule,

    /* Material modules */
    MatButtonModule,
    MatIconModule
  ],
  exports: [BLUERIQ_COMPONENTS]
})
export class ButtonModule {
}
