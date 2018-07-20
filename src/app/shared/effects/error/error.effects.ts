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
import { Actions, Effect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ErrorService } from '../../../blueriq/error/error.service';

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
  startProjectFailed$ = this.actions$.ofType<StartProjectFailedAction>(StartupActions.START_PROJECT_FAILED).pipe(
    tap((action: StartProjectFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  // Fatal error
  @Effect({ dispatch: false })
  loadSessionFailed$ = this.actions$.ofType<LoadSessionFailedAction>(StartupActions.LOAD_SESSION_FAILED).pipe(
    tap((action: LoadSessionFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  /* Session actions */
  // Non-fatal error
  @Effect({ dispatch: false })
  fieldRefreshFailed$ = this.actions$.ofType<FieldRefreshFailedAction>(SessionActions.FIELD_REFRESH_FAILED).pipe(
    tap((action: FieldRefreshFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  // Non-fatal error
  @Effect({ dispatch: false })
  buttonPressFailed$ = this.actions$.ofType<ButtonPressFailedAction>(SessionActions.BUTTON_PRESS_FAILED).pipe(
    tap((action: ButtonPressFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  // Fatal error
  @Effect({ dispatch: false })
  recomposePageFailed$ = this.actions$.ofType<RecomposePageFailedAction>(SessionActions.RECOMPOSE_PAGE_FAILED).pipe(
    tap((action: RecomposePageFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  // Fatal error
  @Effect({ dispatch: false })
  projectChangeFailed$ = this.actions$
  .ofType<ProjectChangeFailedAction>(SessionEventActions.PROJECT_CHANGE_FAILED).pipe(
    tap((action: ProjectChangeFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  constructor(private actions$: Actions, private errorService: ErrorService) {
  }
}
