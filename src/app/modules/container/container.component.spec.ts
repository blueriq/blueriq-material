import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../material.module';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { ContainerComponent } from './container.component';
import { HorizontalFlexChildDirective } from './horizontal-flex-child.directive';

describe('ContainerComponent', () => {
  let containerTemplate: ContainerTemplate;
  let containerComponent: ComponentFixture<ContainerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent, HorizontalFlexChildDirective],
      providers: [BlueriqComponents.register([ContainerComponent])],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormsModule,
        SharedModule
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

    expect(container.card).toBe(true);
    expect(containerComponent.nativeElement.querySelector('.container.card')).toBeTruthy();
    expect(container.horizontal).toBe(false);
  });

  it('should have introduction class when presentation style is set', () => {
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(BqPresentationStyles.INTRODUCTION)
    );

    expect(container.introduction).toBe(true);
    expect(containerComponent.nativeElement.querySelector('.container.introduction')).toBeTruthy();
  });

  it('should have transparent class when presentationstyle is set', () => {
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(BqPresentationStyles.TRANSPARENT)
    );

    expect(container.transparent).toBe(true);
    expect(containerComponent.nativeElement.querySelector('.container.transparent')).toBeTruthy();
  });

  it('should be horizontal class when presentationstyle is set', () => {
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(BqPresentationStyles.HORIZONTAL)
    );

    expect(container.horizontal).toBe(true);
    expect(containerComponent.nativeElement.querySelector('.bq-row')).toBeTruthy();
    expect(containerComponent.nativeElement.querySelectorAll('.bq-row > *').length).toBe(3);
  });

  it('should have alignright class when presentationstyle is set', () => {
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(BqPresentationStyles.ALIGNRIGHT)
    );

    expect(container.alignRight).toBe(true);
    expect(containerComponent.nativeElement.querySelector('.container.align-right')).toBeTruthy();
  });
});
