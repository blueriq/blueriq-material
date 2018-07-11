import { Injectable } from '@angular/core';
import { StartProjectFailedAction, StartupActions } from '@blueriq/angular';
import { Actions, Effect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ErrorService } from '../../error/error.service';

@Injectable()
export class StartProjectFailedEffect {

  @Effect({ dispatch: false })
  test$ = this.actions$.ofType<StartProjectFailedAction>(StartupActions.START_PROJECT_FAILED).pipe(
    tap((action: StartProjectFailedAction) => {
      this.errorService.emitError(action.error['error']);
    })
  );

  constructor(private actions$: Actions, private errorService: ErrorService) {
  }
}
