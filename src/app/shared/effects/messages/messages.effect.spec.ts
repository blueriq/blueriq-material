import type { Mocked } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ChangedPageAction,
  PageUpdatedAction,
  SecurityViolationAction,
  SessionLoadedAction,
  SessionRegistry,
} from '@blueriq/angular';
import { SessionTemplate } from '@blueriq/angular/testing';
import { LanguageConfiguration, SecurityViolations } from '@blueriq/core';
import { PageModelTemplate, PageTemplate } from '@blueriq/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MessagesEffect } from '@shared/effects/messages/messages.effect';
import { Subject } from 'rxjs';

describe('MessagesEffect', () => {
  let actions: Subject<any>;
  let snackBarSpy: Mocked<MatSnackBar>;
  let effects: MessagesEffect;
  let sessionRegistry: SessionRegistry;

  const errorMsg = 'This is an error message';
  const warnMsg = 'This is a warning message';
  const pageWithError = PageTemplate.create().error(errorMsg);
  const pageWithWarning = PageTemplate.create().warning(warnMsg);
  const languageConf: LanguageConfiguration = {
    languageCode: 'nl-NL',
    patterns: {},
    messages: {},
  };

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(async () => {
    snackBarSpy = { open: vi.fn() } as unknown as Mocked<MatSnackBar>;
    actions = new Subject();

    await TestBed.configureTestingModule({
      providers: [
        SessionRegistry,
        MessagesEffect,
        provideMockActions(() => actions),
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();
    sessionRegistry = TestBed.inject(SessionRegistry);
    effects = TestBed.inject(MessagesEffect);
  });

  it('does animate snackbar again even if already displayed the message', async () => {
    const session = SessionTemplate.create()
      .sessionName('Main')
      .pageModel(PageModelTemplate.create(PageTemplate.create().error(errorMsg))).build();
    sessionRegistry.register(session);

    const action = new SessionLoadedAction('Main', undefined, undefined, '1', 3, '', '', languageConf, [pageWithError.toJson()], undefined);
    effects.sessionActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    // messages are already displayed, so snackbar should not be called
    expect(snackBarSpy.open).toHaveBeenCalled();
  });

  it('opens snackbar with an error message when session is loaded', async () => {

    const session = SessionTemplate.create()
      .sessionName('Main')
      .pageModel(PageModelTemplate.create(PageTemplate.create().error(errorMsg))).build();
    sessionRegistry.register(session);

    const action = new SessionLoadedAction('Main', undefined, undefined, '1', 3, '', '', languageConf, [pageWithError.toJson()], undefined);
    effects.sessionActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(snackBarSpy.open).toHaveBeenCalledWith(errorMsg, 'Ok', {
      panelClass: 'snackbar-error',
    });
  });

  it('opens snackbar with an error message when page is updated', async () => {
    const session = SessionTemplate.create()
      .sessionName('my-session')
      .pageModel(PageModelTemplate.create(pageWithError)).build();
    sessionRegistry.register(session);

    const action = new PageUpdatedAction('my-session', [{}] as any);

    effects.sessionActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(snackBarSpy.open).toHaveBeenCalledWith(errorMsg, 'Ok', {
      panelClass: 'snackbar-error',
    });
  });

  it('opens snackbar with an error message when page is changed', async () => {
    const session = SessionTemplate.create()
      .sessionName('my-session')
      .pageModel(PageModelTemplate.create(pageWithError)).build();
    sessionRegistry.register(session);

    const action = new ChangedPageAction('my-session', [{}] as any);

    effects.sessionActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(snackBarSpy.open).toHaveBeenCalledWith(errorMsg, 'Ok', {
      panelClass: 'snackbar-error',
    });
  });

  it('opens snackbar with multiple error messages', async () => {
    const anotherErrorMsg = 'Another error message';
    const session = SessionTemplate.create()
      .sessionName('my-session')
      .pageModel(PageModelTemplate.create(PageTemplate.create().error(errorMsg).error(anotherErrorMsg))).build();
    sessionRegistry.register(session);

    const action = new PageUpdatedAction('my-session', [{}] as any);

    effects.sessionActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(snackBarSpy.open).toHaveBeenCalledWith(`${errorMsg}, ${anotherErrorMsg}`, 'Ok', {
      panelClass: 'snackbar-error',
    });
  });

  it('opens error snackbar with mixed error and warning messages', async () => {
    const session = SessionTemplate.create()
      .sessionName('my-session')
      .pageModel(PageModelTemplate.create(PageTemplate.create().error(errorMsg).warning(warnMsg))).build();
    sessionRegistry.register(session);

    const action = new PageUpdatedAction('my-session', [{}] as any);

    effects.sessionActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(snackBarSpy.open).toHaveBeenCalledWith(`${errorMsg}, ${warnMsg}`, 'Ok', {
      panelClass: 'snackbar-error',
    });
  });

  it('opens snackbar with a warning message', async () => {
    const session = SessionTemplate.create()
      .sessionName('my-session')
      .pageModel(PageModelTemplate.create(pageWithWarning)).build();
    sessionRegistry.register(session);

    const action = new ChangedPageAction('my-session', [{}] as any);

    effects.sessionActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(snackBarSpy.open).toHaveBeenCalledWith(warnMsg, 'Ok', {
      panelClass: 'snackbar-warning',
    });
  });

  it('does not do anything when page has no errors or warnings', async () => {
    const action = new SessionLoadedAction('Main', undefined, undefined, '1', 60, '', '', languageConf, PageModelTemplate.create(PageTemplate.create()).toJson(), undefined);

    effects.sessionActions$.subscribe();
    actions.next(action);

    await vi.advanceTimersByTimeAsync(0);

    expect(snackBarSpy.open).not.toHaveBeenCalled();
  });

  describe('security messages', () => {
    it('shows a snackbar for security violations', async () => {
      const msg1 = 'There are insecure fields on the page';
      const msg2 = 'More messages!';
      const violations = {
        messages: [msg1, msg2],
      } as unknown as SecurityViolations;
      const action = new SecurityViolationAction('Main', violations);

      effects.securityViolations$.subscribe();
      actions.next(action);

      await vi.advanceTimersByTimeAsync(0);

      expect(snackBarSpy.open).toHaveBeenCalledWith(`${msg1}, ${msg2}`, 'Ok', {
        panelClass: 'snackbar-error',
      });
    });

    it('does not show a snackbar when there are no messages', async () => {
      const violations = {
        messages: [],
      } as unknown as SecurityViolations;
      const action = new SecurityViolationAction('Main', violations);

      effects.securityViolations$.subscribe();
      actions.next(action);

      await vi.advanceTimersByTimeAsync(0);

      expect(snackBarSpy.open).not.toHaveBeenCalled();
    });
  });

});
