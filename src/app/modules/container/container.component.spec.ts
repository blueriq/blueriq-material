import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material.module';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
  let containerTemplate: ContainerTemplate;
  let containerComponent: ComponentFixture<ContainerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent/*, PageComponent*/],
      providers: [BlueriqComponents.register([ContainerComponent/*, PageComponent*/])],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    containerTemplate = ContainerTemplate.create()
    .children(
      ContainerTemplate.create(),
      ContainerTemplate.create(),
      ContainerTemplate.create()
    );
    session = BlueriqSessionTemplate.create().build(containerTemplate);
    containerComponent = session.get(ContainerComponent);
  });

  it('should have default expectations', () => {
    const container = containerComponent.componentInstance;

    expect(container.isCard()).toBe(true);
    expect(containerComponent.nativeElement.querySelector('.container.card')).toBeTruthy();
    expect(container.isHorizontal()).toBe(false);
  });

  it('should have introduction class when presentation style is set', () => {
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(BqPresentationStyles.INTRODUCTION)
    );

    expect(container.isIntroduction()).toBe(true);
    expect(containerComponent.nativeElement.querySelector('.container.introduction')).toBeTruthy();
  });

  it('should have transparent class when presentationstyle is set', () => {
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(BqPresentationStyles.TRANSPARENT)
    );

    expect(container.isTransparent()).toBe(true);
    expect(containerComponent.nativeElement.querySelector('.container.transparent')).toBeTruthy();
  });

  it('should be horizontal class when presentationstyle is set', () => {
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(BqPresentationStyles.HORIZONTAL)
    );

    expect(container.isHorizontal()).toBe(true);
    expect(containerComponent.nativeElement.querySelector('.horizontal-flex-target')).toBeTruthy();
    expect(containerComponent.nativeElement.querySelectorAll('.horizontal-flex-target > *').length).toBe(3);
  });

  it('should have alignright class when presentationstyle is set', () => {
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(BqPresentationStyles.ALIGNRIGHT)
    );

    expect(container.isAlignRight()).toBe(true);
    expect(containerComponent.nativeElement.querySelector('.container.align-right')).toBeTruthy();
  });
});
