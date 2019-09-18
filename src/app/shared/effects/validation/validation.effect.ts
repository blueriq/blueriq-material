import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonPressHandledAction } from '@blueriq/angular';
import { FormActions, InvalidFormAction } from '@blueriq/angular/forms';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ValidationEffect {

  @Effect({ dispatch: false })
  invalidForm$: Observable<any> = this.actions$.pipe(
    ofType<ButtonPressHandledAction>(FormActions.INVALID_FORM),
    tap(action => this.showSnackBar(action)),
  );

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {
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
