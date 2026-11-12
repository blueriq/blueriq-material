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

  @Input()
  notification: NotificationModel;

}
