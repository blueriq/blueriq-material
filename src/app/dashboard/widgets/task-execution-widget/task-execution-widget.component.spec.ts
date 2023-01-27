import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BlueriqResponseError, CloseSessionStrategy, Dispatcher, SessionRegistry } from '@blueriq/angular';
import { ErrorType } from '@blueriq/core';
import { DashboardSessionModule, DashboardWidgetSession } from '@blueriq/dashboard';
import { NotificationType } from '../../../notification-overlay/notification.model';
import { DashboardActions } from '../../events/actions';
import { TaskExecutionWidgetComponent } from './task-execution-widget.component';
import createSpy = jasmine.createSpy;
import objectContaining = jasmine.objectContaining;

describe('Task Execution Widget Component', () => {
  beforeEach(async () => {
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
        CloseSessionStrategy,
      ],
    }).compileComponents();
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

  it('should call dispatcher with OpenCaseAction on flow ended call', () => {
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
    expect(dispatcher.dispatch).toHaveBeenCalledWith(objectContaining({
      type: DashboardActions.OPENCASE,
      caseType: expectedCaseType,
      caseId: expectedCaseId,
    }));
  });

  it('should call dispatcher with LoginAction on unauthorized call', () => {
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

    const dispatcher = TestBed.inject(Dispatcher);

    // Act
    fixture.componentInstance.onUnauthorized();

    // Assert
    expect(dispatcher.dispatch).toHaveBeenCalledWith(objectContaining({
      type: DashboardActions.LOGIN,
    }));
  });
});
