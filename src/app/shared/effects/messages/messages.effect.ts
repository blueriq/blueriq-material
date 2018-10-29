import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {
  Action,
  ButtonPressHandledAction,
  SessionEventActions,
  SessionLoadedAction,
  SessionRegistry,
  StartupActions
} from '@blueriq/angular';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MessagesEffect {

  currentMessages: string;

  @Effect({ dispatch: false })
  sessionActions$: Observable<any> = this.actions$.pipe(
    ofType<Action>(StartupActions.SESSION_LOADED, SessionEventActions.CHANGED_PAGE, SessionEventActions.PAGE_UPDATED),
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
        // concatenate all messages, as only one snackbar can be shown at a time
        const messagesAsText = messages.all.map(message => message.text).join(', ');
        // snackbar currently cannot be dismissed, so check if the messages are already displayed
        if (messagesAsText !== this.currentMessages) {
          this.currentMessages = messagesAsText;
          this.snackBar.open(this.currentMessages, undefined, {
            panelClass: (messages.hasErrors) ? 'snackbar-error' : 'snackbar-warning'
          });
        }
      }
    }
  }
}
