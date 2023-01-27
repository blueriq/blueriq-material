import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { CloseSessionStrategy, Dispatcher, SessionRegistry } from '@blueriq/angular';
import { TestDispatcher } from '@blueriq/angular/testing';
import { DashboardSessionModule, DashboardWidgetSession } from '@blueriq/dashboard';
import { SessionWidgetComponent } from './session-widget.component';

describe('Session Widget Component', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessionWidgetComponent],
      imports: [
        RouterModule.forRoot([]),
        DashboardSessionModule,
      ],
      providers: [
        DashboardWidgetSession,
        SessionRegistry,
        { provide: Dispatcher, useClass: TestDispatcher },
        CloseSessionStrategy,
      ],
    }).compileComponents();
  });

  it('should initialize the dashboard session on init', () => {
    // Arrange
    const fixture = TestBed.createComponent(SessionWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };

    // Act
    fixture.componentInstance.ngOnInit();

    // Assert
    expect(fixture.componentInstance.id).toBeDefined();
  });

  it('should uses the dashboard session to get the id', () => {
    // Arrange
    const fixture = TestBed.createComponent(SessionWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };

    // Act
    fixture.componentInstance.ngOnInit();
    const id = fixture.componentInstance.id;

    // Assert
    expect(fixture.componentInstance.widget.id).not.toEqual(id);
  });

  it('should uses the dashboard session to get the sessionName', () => {
    // Arrange
    const fixture = TestBed.createComponent(SessionWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };

    // Act
    fixture.componentInstance.ngOnInit();
    const name =  fixture.componentInstance.sessionName;

    // Assert
    expect(name).toContain('widget-');
  });
});
