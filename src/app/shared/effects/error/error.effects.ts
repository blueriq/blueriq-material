import { Injectable } from '@angular/core';
import {
  ButtonPressFailedAction,
  FieldRefreshFailedAction,
  LoadSessionFailedAction,
  ProjectChangeFailedAction,
  RecomposePageFailedAction,
  SessionActions,
  SessionEventActions,
  StartProjectFailedAction,
  StartupActions
} from '@blueriq/angular';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ErrorService } from '../../../modules/error/error.service';

/**
 * This class exposes Effects so we can detect whether an error has occurred and present the error to the uses.
 *
 * NOTE: This class is temporary; errors will be returned from the BqProjectComponent/BqSessionComponent as
 *       events some time in the near future.
 */
@Injectable()
export class ErrorEffects {

  /* Startup actions */
  // Fatal error
  @Effect({ dispatch: false })
  startProjectFailed$ = this.actions$.pipe(
    ofType<StartProjectFailedAction>(StartupActions.START_PROJECT_FAILED),
    tap((action: StartProjectFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  // Fatal error
  @Effect({ dispatch: false })
  loadSessionFailed$ = this.actions$.pipe(
    ofType<LoadSessionFailedAction>(StartupActions.LOAD_SESSION_FAILED),
    tap((action: LoadSessionFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  /* Session actions */
  // Non-fatal error
  @Effect({ dispatch: false })
  fieldRefreshFailed$ = this.actions$.pipe(
    ofType<FieldRefreshFailedAction>(SessionActions.FIELD_REFRESH_FAILED),
    tap((action: FieldRefreshFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  // Non-fatal error
  @Effect({ dispatch: false })
  buttonPressFailed$ = this.actions$.pipe(
    ofType<ButtonPressFailedAction>(SessionActions.BUTTON_PRESS_FAILED),
    tap((action: ButtonPressFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  // Fatal error
  @Effect({ dispatch: false })
  recomposePageFailed$ = this.actions$.pipe(
    ofType<RecomposePageFailedAction>(SessionActions.RECOMPOSE_PAGE_FAILED),
    tap((action: RecomposePageFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  // Fatal error
  @Effect({ dispatch: false })
  projectChangeFailed$ = this.actions$.pipe(
    ofType<ProjectChangeFailedAction>(SessionEventActions.PROJECT_CHANGE_FAILED),
    tap((action: ProjectChangeFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  constructor(private actions$: Actions, private errorService: ErrorService) {
  }
}
