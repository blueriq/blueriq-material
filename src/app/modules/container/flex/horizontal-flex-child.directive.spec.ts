import { Component, Host } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlueriqComponent, BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { Container } from '@blueriq/core';
import { ContainerTemplate } from '@blueriq/core/testing';
import { HorizontalFlexChildDirective } from './horizontal-flex-child.directive';

@Component({
  template: '<div><ng-container [bqElement]="container.children[0]" bqFlexChild></ng-container></div>',
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

describe('HorizontalFlexChildDirective', () => {
  let parentTemplate: ContainerTemplate;
  let childTemplate: ContainerTemplate;
  let component: MockFlexChildComponent;
  let fixture: ComponentFixture<MockFlexChildComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HorizontalFlexChildDirective,
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

  it('should render child component', () => {
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column').style.flexGrow).toBe('1');
  });

  it('should render child component with irrelevant content style', () => {
    session.update(
      childTemplate.contentStyle('unknown'),
    );
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column').style.flexGrow).toBe('1');
  });

  it('should render child component with Weight presentation style', () => {
    session.update(
      childTemplate.styles('Weight6'),
    );
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column').style.flexGrow).toBe('6');
  });

  it('should render child component with dashboard_column content style', () => {
    session.update(
      childTemplate.contentStyle('dashboard_column8'),
    );
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column').style.flexGrow).toBe('8');
  });

  it('should render child component with Weight presentation style and dashboard_column content style', () => {
    session.update(
      childTemplate.styles('Weight4'),
      childTemplate.contentStyle('dashboard_column7'),
    );
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column').style.flexGrow).toBe('4');
  });

  it('should render child component with invalid Weight presentation style and dashboard_column content style', () => {
    session.update(
      childTemplate.styles('WeightSmall'),
      childTemplate.contentStyle('dashboard_column7'),
    );
    expect(fixture.nativeElement.querySelector('.child')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bq-column').style.flexGrow).toBe('7');
  });
});
