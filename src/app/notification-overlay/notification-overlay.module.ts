import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { NotificationOverlayComponent } from './notification-overlay.component';

const COMPONENTS = [
  NotificationOverlayComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  exports: [COMPONENTS],
})
export class NotificationOverlayModule {
}
