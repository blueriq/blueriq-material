import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PortalChangeAction } from '@blueriq/angular';
import { DashboardAuthService } from '@blueriq/dashboard';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DashboardActions, LoginAction, LogoutAction, NavigateAction, OpenCaseAction } from './actions';

@Injectable()
export class DashboardEffects {

  readonly navigation$: Observable<unknown> = createEffect(() => this.actions$.pipe(
    ofType<NavigateAction>(DashboardActions.NAVIGATE),
    tap(action => this.navigate(action)),
  ), { dispatch: false });

  readonly login$: Observable<unknown> = createEffect(() => this.actions$.pipe(
    ofType<LoginAction>(DashboardActions.LOGIN),
    tap(() => {
      this.authService.login();
    }),
  ), { dispatch: false });

  readonly logout$: Observable<unknown> = createEffect(() => this.actions$.pipe(
    ofType<LogoutAction>(DashboardActions.LOGOUT),
    tap(() => {
      this.authService.logout();
    }),
  ), { dispatch: false });

  readonly openCase$: Observable<unknown> = createEffect(() => this.actions$.pipe(
    ofType<OpenCaseAction>(DashboardActions.OPENCASE),
    map(action => new PortalChangeAction(
      'open-case',
      action.caseType,
      { caseId: action.caseId })),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly authService: DashboardAuthService,
  ) {
  }

  private navigate(action: NavigateAction): Promise<boolean> {
    let queryParameters = action.queryParameters;
    if (this.router.routerState.root.snapshot.queryParams['devtools'] !== undefined) {
      queryParameters = {
        ...queryParameters,
        'devtools': '',
      };
    }
    return this.router.navigate([action.url], { queryParams: queryParameters });
  }
}
