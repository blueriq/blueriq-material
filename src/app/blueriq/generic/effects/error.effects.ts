import { Injectable } from '@angular/core';
import {
  ButtonPressFailedAction,
  FieldRefreshFailedAction,
  HeartbeatActions,
  HeartbeatFailedAction,
  LoadSessionFailedAction,
  OpenWidgetFailedAction,
  ProjectChangeFailedAction,
  RecomposePageFailedAction,
  SessionActions,
  SessionClosedAction,
  SessionEventActions,
  StartProjectFailedAction,
  StartupActions,
  WidgetActions
} from '@blueriq/angular';
import { Actions, Effect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ErrorService } from '../../error/error.service';

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

  /* Open Widget actions */
  // Note: usually, this is about a widget session. For now, show it globally, but when the framework is ready,
  // show it locally in the widget
  // Fatal error if globally; local fatal error in widget
  @Effect({ dispatch: false })
  openWidgetFailed$ = this.actions$.ofType<OpenWidgetFailedAction>(WidgetActions.OPEN_WIDGET_FAILED).pipe(
    tap((action: OpenWidgetFailedAction) => {
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

  /* Session Event actions */
  // Note: usually, this is about a widget session. For now, show it globally, but when the framework is ready,
  // show it locally in the widget
  @Effect({ dispatch: false })
  sessionCLosed$ = this.actions$.ofType<SessionClosedAction>(SessionEventActions.SESSION_CLOSED).pipe(
    tap((action: SessionClosedAction) => {
      // TODO: decide what and how to emit
      // this.errorService.emitError(action.sessionName);
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

  /* Heartbeat actions */
  // Non-fatal error if hiccup; fatal otherwise
  @Effect({ dispatch: false })
  heartbeatFailed$ = this.actions$.ofType<HeartbeatFailedAction>(HeartbeatActions.HEARTBEAT_FAILED).pipe(
    tap((action: HeartbeatFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  constructor(private actions$: Actions, private errorService: ErrorService) {
  }
}
