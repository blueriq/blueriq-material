import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionRegistry } from '@blueriq/angular';
import {
  BlueriqSessionTemplate,
  BlueriqTestingModule,
  BlueriqTestSession,
  SessionTemplate,
} from '@blueriq/angular/testing';
import { ContainerTemplate, PageModelTemplate, PageTemplate } from '@blueriq/core/testing';
import { ContainerModule } from '../../container/container.module';
import { FlowWidgetComponent } from '../flow-widget/flow-widget.component';
import { WidgetModule } from '../widget.module';

describe('WidgetPageComponent', () => {
  let component: ComponentFixture<FlowWidgetComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        BlueriqTestingModule,
        WidgetModule,
        ContainerModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const flowWidgetContainer = ContainerTemplate.create('container')
      .contentStyle('dashboard_flowwidget')
      .properties({ 'info': 'WidgetInfo_DashboardFlowWidget' });

    const widgetPageModel = PageModelTemplate.create(
      PageTemplate.create('pagename')
        .children(
          ContainerTemplate.create('container1'),
          ContainerTemplate.create('container2'),
        ),
    );
    const dashboardSession = SessionTemplate.create()
      .sessionName('session-name-DashboardFlowWidget')
      .pageModel(widgetPageModel).build();

    const sessionRegistry: SessionRegistry = TestBed.inject(SessionRegistry);
    sessionRegistry.register(dashboardSession);

    session = BlueriqSessionTemplate.create().build(flowWidgetContainer);

    component = session.get(FlowWidgetComponent);
    component.detectChanges();
  });

  it('should render a key as id', () => {
    const el = component.nativeElement.querySelector('bq-widget-page > div');
    expect(el).toBeTruthy();
    expect(el.getAttribute('id')).toBe('pagename_1');
  });

  it('should contain 2 containers as children', () => {
    const childContainers = component.nativeElement.querySelectorAll('bq-widget-page bq-container');
    expect(childContainers.length).toBe(2);
    expect(childContainers.item(0).querySelector('div').getAttribute('id')).toBe('container1_1');
    expect(childContainers.item(1).querySelector('div').getAttribute('id')).toBe('container2_1');
  });
});
