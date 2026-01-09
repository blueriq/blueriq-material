import { Injectable, inject } from '@angular/core';
import { Action } from '@blueriq/angular';
import { LiveUpdatesService } from '@blueriq/angular/live-updates';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class CaseAwareService {
  private readonly actions$ = inject(Actions);
  private readonly liveUpdatesService = inject(LiveUpdatesService, { optional: true });


  activateCaseActions$ = createEffect(() => this.actions$.pipe(
    ofType<ActivateCaseAction>('activateCase'),
    tap(action => this.activateCase(action.caseId)),
  ), { dispatch: false });

  deactivateCaseActions$ = createEffect(() => this.actions$.pipe(
    ofType<DeactivateCaseAction>('deactivateCase'),
    tap(action => this.deactivateCase(action.caseId)),
  ), { dispatch: false });

  private activateCase(caseId: string): void {
    this.liveUpdatesService?.subscribe(`/topic/case/${ caseId }`);
  }

  private deactivateCase(caseId: string): void {
    this.liveUpdatesService?.unsubscribe(`/topic/case/${ caseId }`);
  }
}

export class ActivateCaseAction implements Action {
  readonly type = 'activateCase';

  constructor(public readonly caseId: string) {
  }
}

export class DeactivateCaseAction implements Action {
  readonly type = 'deactivateCase';

  constructor(public readonly caseId: string) {
  }
}
