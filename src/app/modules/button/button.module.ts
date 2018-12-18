import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { ButtonComponent } from './button.component';
import { ButtonIconComponent } from './icon/button.icon.component';

const BLUERIQ_COMPONENTS = [
  ButtonComponent,
  ButtonIconComponent,
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS),
  ],
  imports: [
    BlueriqModule.forRoot(), // using bqClasses
    SharedModule,

    /* Material modules */
    MatButtonModule,
    MatIconModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class ButtonModule {
}
