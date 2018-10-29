import { Component, Host } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponent, BlueriqComponents, BlueriqSession } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { Container } from '@blueriq/core';
import { ContainerTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { HeadingModule } from './heading.module';

@BlueriqComponent({
  type: Container
})
@Component({
  template: '<div><bq-heading [title]="container.displayName" [styles]="container.styles"></bq-heading></div>'
})
class MockContainerComponent {
  constructor(@Host() public container: Container) {
  }
}

describe('HeadingComponent', () => {

  let template: ContainerTemplate;
  let fixture: ComponentFixture<MockContainerComponent>;
  let session: BlueriqTestSession;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockContainerComponent],
      providers: [BlueriqComponents.register([MockContainerComponent])],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        HeadingModule
      ]
    });
  });

  beforeEach(() => {
    template = ContainerTemplate
    .create('UserContainer')
    .displayName('User Details')
    .styles(BqPresentationStyles.ICON_FA_PREFIX + 'my_user_icon');

    session = BlueriqSessionTemplate.create().build(template);
    fixture = session.get(MockContainerComponent);
  });

  it('should contain a h2 tag with correct title', () => {
    const h2 = fixture.nativeElement.querySelector('bq-heading').querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2.innerText).toContain('User Details');
  });

  it('should contain a h2 tag with mat-icon', () => {
    const matIcon = fixture.nativeElement.querySelector('bq-heading').querySelector('h2').querySelector('mat-icon');
    expect(matIcon).toBeTruthy();
    expect(matIcon.classList.toString()).toContain('my-user-icon');
  });

  it('should contain a h3 when it is a widget', () => {
    spyOnProperty(BlueriqSession.prototype, 'isWidget').and.returnValue(true);
    session = BlueriqSessionTemplate.create().build(template);
    fixture = session.get(MockContainerComponent);
    const h3 = fixture.nativeElement.querySelector('bq-heading').querySelector('h3');
    expect(h3).toBeTruthy();
    expect(h3.innerText).toContain('User Details');
    expect(h3.classList).toContain('widget');
  });

});
