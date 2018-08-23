import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { FlowWidgetComponent } from './flow-widget.component';
import { WidgetModule } from './widget.module';

fdescribe('FlowWidgetComponent', () => {
  let container: ContainerTemplate;
  let component: ComponentFixture<FlowWidgetComponent>;
  let session: BlueriqTestSession;
  let subSession: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BlueriqTestingModule,
        WidgetModule
      ]
    });
  }));

  beforeEach(() => {
    container = ContainerTemplate.create()
    .contentStyle('dashboard_flowwidget')
    .properties({ 'info': 'WidgetInfo_DashboardFlowWidget' });
    // const page  = PageTemplate.create('session-name-DashboardFlowWidget').build();
    //
    session = BlueriqSessionTemplate.create().build(container);

    //subSession = BlueriqSessionTemplate.create().build(ContainerTemplate.create('somename').displayName('somedisplayname'));
    component = session.get(FlowWidgetComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    console.log(component.nativeElement);
  });

});
