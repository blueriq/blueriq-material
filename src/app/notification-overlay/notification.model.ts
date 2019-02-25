export interface DismissInfo {
  /** The label to display for dismissing the error */
  label: string;

  /** The action to execute when the error is dismissed */
  action(): void;
}

export const enum NotificationType {
  Error = 'error',
  SessionExpired = 'expired',
  LoggedOut = 'logged-out',
}

/**
 * This class represents a notification to be shown.
 */
export class NotificationModel {

  dismiss?: DismissInfo;

  constructor(public type: NotificationType,
              public title: string,
              public message: string,
              public details?: string) {
  }

}
