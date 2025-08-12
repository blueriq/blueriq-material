import { Injectable } from '@angular/core';
import {
  LiveUpdate,
  LiveUpdateAction,
  LiveUpdatesActions,
  LiveUpdatesConnectionLostAction,
  LiveUpdatesReconnectedAction,
  PingUpdate,
  TaskCompletedUpdate,
} from '@blueriq/angular/live-updates';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Injectable()
export class LiveUpdatesEffect {

  reconnectedActions$ = createEffect(() => this.actions$.pipe(
    ofType<LiveUpdatesReconnectedAction>(LiveUpdatesActions.RECONNECTED),
    tap(action => this.showReconnectionMessage()),
  ), { dispatch: false });

  connectionLostActions$ = createEffect(() => this.actions$.pipe(
    ofType<LiveUpdatesConnectionLostAction>(LiveUpdatesActions.CONNECTION_LOST),
    tap(action => this.showConnectionLostMessage()),
  ), { dispatch: false });

  liveUpdateAction$ = createEffect(() => this.actions$.pipe(
    ofType<LiveUpdateAction>(LiveUpdatesActions.LIVE_UPDATE_ACTION_NAME),
    tap(action => this.processLiveUpdate(action.liveUpdate)),
  ), { dispatch: false });

  constructor(private readonly actions$: Actions,
              private readonly toastrService: ToastrService,
  ) {
  }

  private showReconnectionMessage(): void {
    this.toastrService.info('The connection with the event bus has been reestablished. Reload to get the latest changes.', 'Connection' +
      ' reestablished');
  }

  private showConnectionLostMessage(): void {
    this.toastrService.error('The connection with the event bus is lost. You will not receive live updates while the application is' +
      ' trying to reconnect.', 'Connection lost');
  }

  private processLiveUpdate(update: LiveUpdate): void {
    if (update instanceof TaskCompletedUpdate) {
      this.toastrService.success(`Task ${ update.taskNameDefaultLanguage } is completed`, 'Task Completed');
    } else if (update instanceof PingUpdate) {
      this.toastrService.success('Ping received');
    }
  }
}
