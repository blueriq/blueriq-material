import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material.module';
import { PresentationStylesNew } from '../PresentationStylesNew';
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
        BrowserAnimationsModule, // or NoopAnimationsModule
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

  it('should be created', () => {
    expect(containerComponent).toBeTruthy();
  });

  it('should have default expectations', () => {
    // init
    const container = containerComponent.componentInstance;

    // Verify
    expect(container.displayMode).toBe('card');
    expect(containerComponent.nativeElement.querySelector('.container.card')).toBeTruthy();
    expect(container.horizontal).toBeFalsy();
    expect(containerComponent.nativeElement.querySelector('.grid')).toBeFalsy();

  });

  it('should have introduction class when presentationstyle is set', () => {
    // init
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(PresentationStylesNew.INTRODUCTION)
    );

    // Sut
    const display = container.displayMode;

    // Verify
    expect(display).toBe('introduction');
    expect(containerComponent.nativeElement.querySelector('.container.introduction')).toBeTruthy();
  });

  it('should have transparent class when presentationstyle is set', () => {
    // init
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(PresentationStylesNew.TRANSPARENT)
    );

    // Sut
    const display = container.displayMode;

    // Verify
    expect(display).toBe('transparent');
    expect(containerComponent.nativeElement.querySelector('.container.transparent')).toBeTruthy();
    expect(containerComponent.nativeElement.querySelector('.grid')).toBeFalsy();
  });

  it('should be horizontal class when presentationstyle is set', () => {
    // init
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(PresentationStylesNew.HORIZONTAL)
    );

    // Sut
    const isHorizontal = container.horizontal;

    // Verify
    expect(isHorizontal).toBeTruthy();
    expect(containerComponent.nativeElement.querySelector('.grid')).toBeTruthy();
    expect(containerComponent.nativeElement.querySelectorAll('.grid-item').length).toBe(3);
  });

});
