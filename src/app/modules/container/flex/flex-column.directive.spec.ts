import { Component, Host } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlueriqComponent, BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { Container } from '@blueriq/core';
import { ContainerTemplate } from '@blueriq/core/testing';
import { FlexColumnDirective } from './flex-column.directive';

@Component({
  template: '<div><ng-container [bqElement]="container.children[0]" bqFlexColumn></ng-container></div>',
})
@BlueriqComponent({
  type: Container,
  selector: 'parent',
})
class MockFlexParentComponent {
  constructor(@Host() public container: Container) {
  }
}

@Component({
  template: '<div class="child"></div>',
})
@BlueriqComponent({
  type: Container,
})
class MockFlexChildComponent {
}

describe('FlexColumnDirective', () => {
  let parentTemplate: ContainerTemplate;
  let childTemplate: ContainerTemplate;
  let component: MockFlexChildComponent;
  let fixture: ComponentFixture<MockFlexChildComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FlexColumnDirective,
        MockFlexChildComponent,
        MockFlexParentComponent,
      ],
      providers: [BlueriqComponents.register([
        MockFlexChildComponent,
        MockFlexParentComponent,
      ])],
      imports: [BlueriqTestingModule],
    });
  }));

  beforeEach(() => {
    parentTemplate = ContainerTemplate.create().contentStyle('parent').children(
      childTemplate = ContainerTemplate.create(),
    );
    session = BlueriqSessionTemplate.create().build(parentTemplate);
    fixture = session.get(MockFlexParentComponent);
    component = fixture.componentInstance;
  });

  it('should have no effect when the child is not a dashboard_column', () => {
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeFalsy();
  });

  it('should have no effect when the child is not a dashboard_column and a Weight presentation style is present', () => {
    session.update(
      childTemplate.styles('Weight9'),
    );
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeFalsy();
  });

  it('should have a default weight with the dashboard_column content style', () => {
    session.update(
      childTemplate.contentStyle('dashboard_column'),
    );
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-row')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column').style.flexGrow).toBe('1');
  });

  it('should use the weight from the Weight6 presentation style', () => {
    session.update(
      childTemplate.styles('Weight6').contentStyle('dashboard_column'),
    );
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-row')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column').style.flexGrow).toBe('6');
  });

  it('should use the weight from the dashboard_column8 content style', () => {
    session.update(
      childTemplate.contentStyle('dashboard_column8'),
    );
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-row')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column').style.flexGrow).toBe('8');
  });

  it('should use the weight from the Weight14 presentation style over the dashboard_column7 content style', () => {
    session.update(
      childTemplate.styles('Weight14'),
      childTemplate.contentStyle('dashboard_column7'),
    );
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-row')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column').style.flexGrow).toBe('14');
  });

  it('should NOT use the weight from the dashboard_column7 content style when presentation style with invalid weight value is set', () => {
    session.update(
      // Set invalid (no trailing number) weight presentation style
      childTemplate.styles('WeightBig'),
      childTemplate.contentStyle('dashboard_column7'),
    );
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-row')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column').style.flexGrow).toBe('1');
  });
});
