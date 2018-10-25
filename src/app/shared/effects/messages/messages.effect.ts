import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {
  Action,
  ButtonPressHandledAction,
  SessionActions,
  SessionLoadedAction,
  SessionRegistry,
  StartupActions
} from '@blueriq/angular';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MessagesEffect {

  @Effect({ dispatch: false })
  buttonActions$: Observable<any> = this.actions$.pipe(
    ofType<Action>(StartupActions.SESSION_LOADED, SessionActions.BUTTON_PRESS_HANDLED),
    tap(action => this.showSnackBar(action))
  );

  constructor(private actions$: Actions,
              private snackBar: MatSnackBar,
              private sessionRegistry: SessionRegistry) {
  }

  private showSnackBar(action: ButtonPressHandledAction | SessionLoadedAction): void {
    const session = this.sessionRegistry.getByNameOptionally(action.sessionName);

    if (session) {
      const messages = session.pageModel.page.messages;
      if (messages.hasMessages) {
        const msgAsText: string[] = [];
        messages.all.forEach(message => msgAsText.push(message.text));
        this.snackBar.open(msgAsText.join(), undefined, {
          panelClass: 'snackbar-error'
        });
      }
    }
  }
}
