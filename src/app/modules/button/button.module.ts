import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
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
    BlueriqCommonModule,
    SharedModule,

    /* Material modules */
    MatButtonModule,
    MatIconModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class ButtonModule {
}
