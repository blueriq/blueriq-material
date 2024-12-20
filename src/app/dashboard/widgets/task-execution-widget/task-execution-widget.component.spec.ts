import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  BlueriqResponseError,
  CloseSessionStrategy,
  Dispatcher,
  SessionEventActions,
  SessionRegistry
} from '@blueriq/angular';
import { ErrorType } from '@blueriq/core';
import {
  BlueriqDashboard,
  DashboardAuthService,
  DashboardSessionModule,
  DashboardWidgetSession
} from '@blueriq/dashboard';
import { NotificationType } from '../../../notification-overlay/notification.model';
import { TaskExecutionWidgetComponent } from './task-execution-widget.component';
import { Actions } from '@ngrx/effects';
import { Subject } from 'rxjs';
import createSpy = jasmine.createSpy;
import objectContaining = jasmine.objectContaining;

describe('Task Execution Widget Component', () => {
  beforeEach(async () => {
    jasmine.clock().install();
    await TestBed.configureTestingModule({
      declarations: [TaskExecutionWidgetComponent],
      imports: [
        RouterModule.forRoot([]),
        DashboardSessionModule,
      ],
      providers: [
        DashboardWidgetSession,
        SessionRegistry,
        {
          provide: Dispatcher,
          useClass: class {
            dispatch = createSpy('dispatch');
          },
        },
        {
          provide: DashboardAuthService,
          useClass: class {
            login = createSpy('login');
          },
        },
        BlueriqDashboard,
        {
          provide: Actions,
          useValue: new Subject(),
        },
        CloseSessionStrategy,
      ],
    }).compileComponents();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should set correct notification on session expired call', () => {
    // Arrange
    const fixture = TestBed.createComponent(TaskExecutionWidgetComponent);
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
    fixture.componentInstance.onSessionExpired('test-case', '777');

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.SessionExpired);
    expect(notification!.title).toEqual('Task Session Expired');
    expect(notification!.message).toEqual('The task session has expired.');
    expect(notification!.dismiss?.label).toEqual('Back to case...');
  });

  it('should set correct notification on error call with BlueriqError', () => {
    // Arrange
    const fixture = TestBed.createComponent(TaskExecutionWidgetComponent);
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
    }, 'test-case', '777');

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Error);
    expect(notification!.title).toEqual('error');
    expect(notification!.message).toEqual('woepsie');
    expect(notification!.dismiss?.label).toEqual('Back to case...');
  });

  it('should set correct notification on error call with generic error', () => {
    // Arrange
    const fixture = TestBed.createComponent(TaskExecutionWidgetComponent);
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
    }, 'test-case', '777');

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Error);
    expect(notification!.title).toEqual('Oops!');
    expect(notification!.message).toEqual('An unknown error occurred');
    expect(notification!.dismiss?.label).toEqual('Back to case...');
  });

  it('should set correct notification on forbidden call', () => {
    // Arrange
    const fixture = TestBed.createComponent(TaskExecutionWidgetComponent);
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
    fixture.componentInstance.onForbidden('test-case', '777');

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Error);
    expect(notification!.title).toEqual('Forbidden');
    expect(notification!.message).toEqual('You are forbidden to execute this task.');
    expect(notification!.dismiss?.label).toEqual('Back to case...');
  });

  it('should show notification and call dispatcher with OpenCaseAction on flow ended call', () => {
    // Arrange
    const fixture = TestBed.createComponent(TaskExecutionWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    const expectedCaseType = 'test-case';
    const expectedCaseId = '777';
    const dispatcher = TestBed.inject(Dispatcher);

    // Act
    fixture.componentInstance.onFlowEnded(expectedCaseType, expectedCaseId);

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Info);
    expect(notification!.title).toEqual('Task completed');
    expect(notification!.message).toEqual('You will be redirected back to the case dashboard in a moment.');
    expect(notification!.dismiss).toBeUndefined();

    // Fast-forward clock to after redirection timeout
    jasmine.clock().tick(2001);

    expect(dispatcher.dispatch).toHaveBeenCalledWith(objectContaining({
      type: SessionEventActions.PORTAL_CHANGE,
      changeType: 'open-case',
      changeContext: expectedCaseType,
      parameters: { caseId: expectedCaseId },
    }));
  });
});
