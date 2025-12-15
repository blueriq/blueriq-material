import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormActions, InvalidFormAction } from '@blueriq/angular/forms';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class ValidationEffect {

  invalidForm$ = createEffect(() => this.actions$.pipe(
    ofType<InvalidFormAction>(FormActions.INVALID_FORM),
    tap(action => this.showSnackBar(action)),
  ), { dispatch: false });

  constructor(private readonly actions$: Actions, private readonly snackBar: MatSnackBar) {
  }

  private showSnackBar(action: InvalidFormAction): void {
    if (action.hasErrors) {
      this.snackBar.open(action.message || 'There are validation errors on the page', undefined, {
        duration: 5000,
        panelClass: 'snackbar-error',
      });
    } else if (action.hasWarnings) {
      this.snackBar.open(action.message || 'There are validation warnings on the page', undefined, {
        duration: 5000,
        panelClass: 'snackbar-warning',
      });
    }
  }
}
