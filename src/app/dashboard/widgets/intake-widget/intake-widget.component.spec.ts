import {TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {BlueriqResponseError, CloseSessionStrategy, Dispatcher, SessionRegistry} from '@blueriq/angular';
import {ErrorType} from '@blueriq/core';
import {
  BlueriqDashboard,
  DashboardAuthService,
  DashboardSessionModule,
  DashboardWidgetSession,
} from '@blueriq/dashboard';
import {Actions} from '@ngrx/effects';
import {Subject} from 'rxjs';
import {NotificationType} from '../../../notification-overlay/notification.model';
import {IntakeWidgetComponent} from './intake-widget.component';
import createSpy = jasmine.createSpy;

describe('Intake Widget Component', () => {
  beforeEach(async () => {
    jasmine.clock().install();
    await TestBed.configureTestingModule({
      declarations: [IntakeWidgetComponent],
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

  it('should do nothing yet on flow ended call', () => {
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
    fixture.componentInstance.onFlowEnded();

    // Assert
    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Info);
    expect(notification!.title).toEqual('Case intake completed');
    expect(notification!.message).toEqual('The case intake has been completed.');
    expect(notification!.dismiss).toBeUndefined();
  });
});
