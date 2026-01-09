import { Injectable, inject } from '@angular/core';
import { Action } from '@blueriq/angular';
import { LiveUpdatesService } from '@blueriq/angular/live-updates';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class TaskAwareService {
  private readonly actions$ = inject(Actions);
  private readonly liveUpdatesService = inject(LiveUpdatesService, { optional: true });


  activateTaskActions$ = createEffect(() => this.actions$.pipe(
    ofType<ActivateTaskAction>('activateTask'),
    tap(action => this.activateTask(action.taskId)),
  ), { dispatch: false });

  deactivateTaskActions$ = createEffect(() => this.actions$.pipe(
    ofType<DeactivateTaskAction>('deactivateTask'),
    tap(action => this.deactivateTask(action.taskId)),
  ), { dispatch: false });

  private activateTask(taskId: string): void {
    this.liveUpdatesService?.subscribe(`/topic/task/${ taskId }`);
  }

  private deactivateTask(taskId: string): void {
    this.liveUpdatesService?.unsubscribe(`/topic/task/${ taskId }`);
  }
}

export class ActivateTaskAction implements Action {
  readonly type = 'activateTask';

  constructor(public readonly taskId: string) {
  }
}

export class DeactivateTaskAction implements Action {
  readonly type = 'deactivateTask';

  constructor(public readonly taskId: string) {
  }
}
