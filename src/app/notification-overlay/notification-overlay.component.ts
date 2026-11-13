import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NotificationModel } from './notification.model';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'bq-notification-overlay',
    templateUrl: './notification-overlay.component.html',
    styleUrls: ['./notification-overlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButton]
})
export class NotificationOverlayComponent {

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  notification: NotificationModel;

}
