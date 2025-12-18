import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NotificationModel } from './notification.model';

@Component({
    selector: 'bq-notification-overlay',
    templateUrl: './notification-overlay.component.html',
    styleUrls: ['./notification-overlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NotificationOverlayComponent {

  @Input()
  notification: NotificationModel;

}
