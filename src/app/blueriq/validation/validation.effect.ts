import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ButtonPressHandledAction, Session, SessionActions, SessionStore } from '@blueriq/angular';
import { Button } from '@blueriq/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class PageValidationEffects {

  @Effect({ dispatch: false })
  buttonHandled$: Observable<any> = this.actions$
  .ofType<ButtonPressHandledAction>(SessionActions.BUTTON_PRESS_HANDLED).pipe(
    tap(action => this.checkValidations(action))
  );

  constructor(private actions$: Actions, private sessionStore: SessionStore, private snackBar: MatSnackBar) {
  }

  private checkValidations(action: ButtonPressHandledAction): void {
    const session = this.sessionStore.getByNameOptionally(action.sessionName);
    if (!session) {
      return;
    }
    const element = session.pageModel.getElementOptionally(action.elementKey);
    if (element instanceof Button && element.validate) {
      this.showSnackBar(session);
    }
  }

  private showSnackBar(session: Session): void {
    if (session.form.hasErrors) {
      this.snackBar.open(session.language.patterns['page.validations.message'] ||
        'There are validation errors on the page', undefined, {
        duration: 5000,
        panelClass: 'snackbar-error'
      });
    } else if (session.form.hasWarnings) {
      this.snackBar.open(session.language.patterns['page.validations.message'] ||
        'There are validation warnings on the page', undefined, {
        duration: 5000,
        panelClass: 'snackbar-warning'
      });
    }
  }
}
