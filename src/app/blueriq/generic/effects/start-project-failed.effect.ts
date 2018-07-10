import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StartProjectFailedAction, StartupActions } from '@blueriq/angular';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Injectable()
export class StartProjectFailedEffect {

  @Effect({ dispatch: false })
  test$ = this.actions$.ofType<StartProjectFailedAction>(StartupActions.START_PROJECT_FAILED).pipe(
    tap((action: Action) => this.router.navigate(['/error'], {
      queryParams: { type: action.type }
    }))
  );

  constructor(private actions$: Actions, private router: Router) {
  }
}
