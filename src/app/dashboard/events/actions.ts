import { Action } from '@blueriq/angular';

export class DashboardActions {
  static readonly REFRESH = '[Blueriq - Dashboard] Refresh';
}

export class RefreshAction implements Action {
  readonly type = DashboardActions.REFRESH;
}
