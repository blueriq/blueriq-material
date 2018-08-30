import { Component, Host } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlueriqComponent, BlueriqComponents, FailedAction, SessionRegistry } from '@blueriq/angular';
import {
  BlueriqSessionTemplate,
  BlueriqTestingModule,
  BlueriqTestSession,
  SessionTemplate
} from '@blueriq/angular/testing';
import { Page } from '@blueriq/core';
import { ContainerTemplate, PageModelTemplate, PageTemplate } from '@blueriq/core/testing';
import { FlowWidgetComponent } from './flow-widget.component';
import { WidgetModule } from './widget.module';

@Component({
  template: '<span id="widgetSessionDisplayName">{{page.displayName}}</span>'
})
@BlueriqComponent({
  type: Page
})
class MockPageComponent {

  constructor(@Host() public readonly page: Page) {
  }
}

fdescribe('FlowWidgetComponent', () => {
  let container: ContainerTemplate;
  let component: ComponentFixture<FlowWidgetComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockPageComponent],
      providers: [BlueriqComponents.register([MockPageComponent])],
      imports: [
        BlueriqTestingModule,
        WidgetModule
      ]
    });
  }));

  beforeEach(() => {
    container = ContainerTemplate.create('containername')
    .displayName('Container display name')
    .contentStyle('dashboard_flowwidget')
    .properties({ 'info': 'WidgetInfo_DashboardFlowWidget' });

    const pageModel = PageModelTemplate.create(PageTemplate.create('pagename').displayName('Widget display name'));
    const dashboardSession = SessionTemplate.create()
    .sessionName('session-name-DashboardFlowWidget')
    .pageModel(pageModel).build();

    const sessionRegistry: SessionRegistry = TestBed.get(SessionRegistry);
    sessionRegistry.register(dashboardSession);

    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(FlowWidgetComponent);
  });

  it('should contain the correct elements', () => {
    // Init
    const header2 = component.nativeElement.querySelector('h2');
    const widgetSessionSpan = component.nativeElement.querySelector('#widgetSessionDisplayName');

    // Verify
    expect(header2.innerHTML).toEqual('Container display name');
    expect(widgetSessionSpan.innerHTML).toEqual('Widget display name');
  });

  it('should display an error message when widget fails to load', () => {
    const bqError: FailedAction = { error: { cause: { message: 'whoops' } }, type: 'some_error' };
    component.componentInstance.bqError = bqError;
    component.detectChanges();

    const widgetSessionSpan = component.nativeElement.querySelector('#widgetSessionDisplayName');
    const errorElement = component.nativeElement.querySelector('mat-error');

    // Verify 
    expect(widgetSessionSpan).toBeFalsy();
    expect(errorElement).toBeTruthy();
    expect(errorElement.innerText.trim()).toBe('whoops');
  });

});
