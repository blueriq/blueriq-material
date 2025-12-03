import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { NotificationOverlayComponent } from './notification-overlay.component';

const COMPONENTS = [
  NotificationOverlayComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [COMPONENTS],
})
export class NotificationOverlayModule {
}
