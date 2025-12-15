import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
