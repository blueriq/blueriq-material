import { AsyncPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  BlueriqResponseError,
  CaseCreatedAction,
  CloseSessionStrategy,
  Dispatcher,
  IntakeCompletedAction,
  SessionEventActions,
  SessionRegistry,
} from '@blueriq/angular';
import { ErrorType } from '@blueriq/core';
import {
  BlueriqDashboard,
  DashboardAuthService,
  DashboardSessionModule,
  DashboardWidgetSession,
} from '@blueriq/dashboard';
import { Actions } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { NotificationType } from '../../../notification-overlay/notification.model';
import { IntakeWidgetComponent } from './intake-widget.component';

describe('Intake Widget Component', () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        DashboardSessionModule,
        IntakeWidgetComponent,
      ],
      providers: [
        DashboardWidgetSession,
        SessionRegistry,
        {
          provide: Dispatcher,
          useClass: class {
            dispatch = vi.fn();
          },
        },
        {
          provide: DashboardAuthService,
          useClass: class {
            login = vi.fn();
          },
        },
        BlueriqDashboard,
        {
          provide: Actions,
          useValue: new Subject(),
        },
        CloseSessionStrategy,
      ],
    }).overrideComponent(IntakeWidgetComponent, { set: { imports: [AsyncPipe], schemas: [NO_ERRORS_SCHEMA] } }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should set correct notification on session expired call', () => {
    // Arrange
    const fixture = TestBed.createComponent(IntakeWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    // Act
    fixture.componentInstance.onSessionExpired();

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.SessionExpired);
    expect(notification!.title).toEqual('Intake Session Expired');
    expect(notification!.message).toEqual('The case intake session has expired.');
  });

  it('should set correct notification on error call with BlueriqError', () => {
    // Arrange
    const fixture = TestBed.createComponent(IntakeWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    // Act
    fixture.componentInstance.onError({
      error: new BlueriqResponseError({
        errorType: ErrorType.Exception,
        message: 'woepsie',
        title: 'error',
      }), type: 'error',
    });

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Error);
    expect(notification!.title).toEqual('error');
    expect(notification!.message).toEqual('woepsie');
    expect(notification!.dismiss).toBeUndefined();
  });

  it('should set correct notification on error call with generic error', () => {
    // Arrange
    const fixture = TestBed.createComponent(IntakeWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    // Act
    fixture.componentInstance.onError({
      error: 'error', type: 'error',
    });

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Error);
    expect(notification!.title).toEqual('Oops!');
    expect(notification!.message).toEqual('An unknown error occurred');
    expect(notification!.dismiss).toBeUndefined();
  });

  it('should set correct notification on forbidden call', () => {
    // Arrange
    const fixture = TestBed.createComponent(IntakeWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    // Act
    fixture.componentInstance.onForbidden();

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Error);
    expect(notification!.title).toEqual('Forbidden');
    expect(notification!.message).toEqual('You are not allowed to start this case intake.');
    expect(notification!.dismiss).toBeUndefined();
  });

  it('should set correct notification on intake completed call', () => {
    // Arrange
    const fixture = TestBed.createComponent(IntakeWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    // Act
    const action = new IntakeCompletedAction('session', 'reference', 'id');
    fixture.componentInstance.onIntakeCompleted(action);

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Info);
    expect(notification!.title).toEqual('Intake Completed');
    expect(notification!.message).toEqual(`The case intake has been completed. You will be redirected to the case with reference '${action.reference}' when it is ready.`);
    expect(notification!.dismiss?.label).toBeUndefined();
  });

  it('should set correct notification on intake aborted call', () => {
    // Arrange
    const fixture = TestBed.createComponent(IntakeWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    // Act
    fixture.componentInstance.onIntakeAborted();

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Info);
    expect(notification!.title).toEqual('Intake Aborted');
    expect(notification!.message).toEqual('The case intake has been aborted.');
    expect(notification!.dismiss?.label).toEqual('Dismiss');
  });

  it('should dispatch on case created call', () => {
    // Arrange
    const fixture = TestBed.createComponent(IntakeWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();
    const dispatcher = TestBed.inject(Dispatcher);

    // Act
    const action = new CaseCreatedAction('session', '123', 'id');
    fixture.componentInstance.onCaseCreated(action, 'ZONE');

    // Assert
    expect(dispatcher.dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: SessionEventActions.PORTAL_CHANGE,
      changeType: 'open-case',
      changeContext: 'ZONE',
      parameters: { caseId: action.caseId },
    }));
  });
});
