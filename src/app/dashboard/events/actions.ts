import { Params } from '@angular/router';
import { Action } from '@blueriq/angular';

export class DashboardActions {
  static readonly NAVIGATE = '[Blueriq - Dashboard] Navigate';
  static readonly LOGIN = '[Blueriq - Dashboard] Login';
  static readonly LOGOUT = '[Blueriq - Dashboard] Logout';
  static readonly REFRESH = '[Blueriq - Dashboard] Refresh';
  static readonly OPENCASE = '[Blueriq - Dashboard] Open Case';
}

export class NavigateAction implements Action {
  readonly type = DashboardActions.NAVIGATE;

  constructor(public readonly url: string, public readonly queryParameters?: Params | undefined) {
  }
}

export class LoginAction implements Action {
  readonly type = DashboardActions.LOGIN;
}

export class LogoutAction implements Action {
  readonly type = DashboardActions.LOGOUT;
}

export class RefreshAction implements Action {
  readonly type = DashboardActions.REFRESH;
}

export class OpenCaseAction implements Action {
  readonly type = DashboardActions.OPENCASE;

  constructor(public readonly caseId: string, public readonly caseType: string) {
  }
}
