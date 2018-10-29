import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChangedPageAction, PageUpdatedAction, SessionLoadedAction, SessionRegistry } from '@blueriq/angular';
import { BlueriqTestingModule, SessionTemplate } from '@blueriq/angular/testing';
import { LanguageConfiguration } from '@blueriq/core';
import { PageModelTemplate, PageTemplate } from '@blueriq/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MessagesEffect } from '@shared/effects/messages/messages.effect';
import { Subject } from 'rxjs/Subject';

fdescribe('MessagesEffect', () => {
  let actions: Subject<any>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let effects: MessagesEffect;
  let sessionRegistry: SessionRegistry;

  const errorMsg = 'This is an error message';
  const warnMsg = 'This is a warning message';
  const pageWithError = PageTemplate.create().error(errorMsg);
  const pageWithWarning = PageTemplate.create().warning(warnMsg);
  const languageConf: LanguageConfiguration = {
    languageCode: 'nl-NL',
    patterns: {},
    messages: {}
  };

  beforeEach(async(() => {
    snackBarSpy = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    actions = new Subject();

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule
      ],
      providers: [
        MessagesEffect,
        provideMockActions(() => actions),
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });
    sessionRegistry = TestBed.get(SessionRegistry);
    effects = TestBed.get(MessagesEffect);
  }));

  it('opens snackbar with an error message when session is loaded', fakeAsync(() => {
    const action = new SessionLoadedAction('Main', '1', '2', 3, '', languageConf, [pageWithError.toJson()]);

    effects.sessionActions$.subscribe();
    actions.next(action);

    tick();

    expect(snackBarSpy.open).toHaveBeenCalledWith(errorMsg, undefined, {
      panelClass: 'snackbar-error'
    });
  }));

  it('opens snackbar with an error message when page is updated', fakeAsync(() => {
    const session = SessionTemplate.create()
    .sessionName('my-session')
    .pageModel(PageModelTemplate.create(pageWithError)).build();
    sessionRegistry.register(session);

    const action = new PageUpdatedAction('my-session', [{}] as any);

    effects.sessionActions$.subscribe();
    actions.next(action);

    tick();

    expect(snackBarSpy.open).toHaveBeenCalledWith(errorMsg, undefined, {
      panelClass: 'snackbar-error'
    });
  }));

  it('opens snackbar with an error message when page is changed', fakeAsync(() => {
    const session = SessionTemplate.create()
    .sessionName('my-session')
    .pageModel(PageModelTemplate.create(pageWithError)).build();
    sessionRegistry.register(session);

    const action = new ChangedPageAction('my-session', [{}] as any);

    effects.sessionActions$.subscribe();
    actions.next(action);

    tick();

    expect(snackBarSpy.open).toHaveBeenCalledWith(errorMsg, undefined, {
      panelClass: 'snackbar-error'
    });
  }));

  it('opens snackbar with multiple error messages', fakeAsync(() => {
    const anotherErrorMsg = 'Another error message';
    const session = SessionTemplate.create()
    .sessionName('my-session')
    .pageModel(PageModelTemplate.create(PageTemplate.create().error(errorMsg).error(anotherErrorMsg))).build();
    sessionRegistry.register(session);

    const action = new PageUpdatedAction('my-session', [{}] as any);

    effects.sessionActions$.subscribe();
    actions.next(action);

    tick();

    expect(snackBarSpy.open).toHaveBeenCalledWith(`${errorMsg}, ${anotherErrorMsg}`, undefined, {
      panelClass: 'snackbar-error'
    });
  }));

  it('opens snackbar with a warning message', fakeAsync(() => {
    const session = SessionTemplate.create()
    .sessionName('my-session')
    .pageModel(PageModelTemplate.create(pageWithWarning)).build();
    sessionRegistry.register(session);

    const action = new ChangedPageAction('my-session', [{}] as any);

    effects.sessionActions$.subscribe();
    actions.next(action);

    tick();

    expect(snackBarSpy.open).toHaveBeenCalledWith(warnMsg, undefined, {
      panelClass: 'snackbar-warning'
    });
  }));

  it('does not animate snackbar when it already displays the messages', fakeAsync(() => {
    // set currently displayed messages
    effects.currentMessages = errorMsg;

    const action = new SessionLoadedAction('Main', '1', '2', 3, '', languageConf, [pageWithError.toJson()]);

    effects.sessionActions$.subscribe();
    actions.next(action);

    tick();

    // messages are already displayed, so snackbar should not be called
    expect(snackBarSpy.open).not.toHaveBeenCalled();
  }));

  it('does not do anything when page has no errors or warnings', fakeAsync(() => {
    const action = new SessionLoadedAction('Main', '1', '2', 60, '', languageConf, PageModelTemplate.create(PageTemplate.create()).toJson());

    effects.sessionActions$.subscribe();
    actions.next(action);

    tick();

    expect(snackBarSpy.open).not.toHaveBeenCalled();
  }));
});
