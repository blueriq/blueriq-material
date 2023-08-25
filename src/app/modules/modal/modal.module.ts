import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { ButtonModule } from '../button/button.module';
import { ModalComponent } from './modal.component';
import { SharedModule } from '@shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HeadingModule } from '../heading/heading.module';
import { MatButtonModule } from '@angular/material/button';

const COMPONENTS = [ModalComponent];

@NgModule({
  declarations: [COMPONENTS],
  providers: [BlueriqComponents.register(COMPONENTS)],
  imports: [BlueriqCommonModule, CommonModule, MatIconModule, ButtonModule, SharedModule, MatDialogModule,
    HeadingModule, MatButtonModule],
  exports: [COMPONENTS],
})
export class ModalModule {
}
