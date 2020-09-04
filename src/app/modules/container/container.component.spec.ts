import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { BqContainerDirective } from '@shared/directive/container/bq-container.directive';
import { SharedModule } from '@shared/shared.module';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { ContainerComponent } from './container.component';
import { ContainerModule } from './container.module';

describe('ContainerComponent', () => {
  let containerTemplate: ContainerTemplate;
  let containerComponent: ComponentFixture<ContainerComponent>;
  let session: BlueriqTestSession;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        SharedModule,
        ContainerModule,
      ],
    });
  }));

  beforeEach(() => {
    containerTemplate = ContainerTemplate.create()
      .children(
        ContainerTemplate.create(),
        ContainerTemplate.create(),
        ContainerTemplate.create(),
      );
    session = BlueriqSessionTemplate.create().build(containerTemplate);
    containerComponent = session.get(ContainerComponent);
  });

  it('should have be card and not horizontal by default', () => {
    const container = containerComponent.componentInstance;

    expect(containerComponent.nativeElement.querySelector('.card')).toBeTruthy();
    expect(container.isHorizontal).toBe(false);
  });

  it('should have introduction class when presentation style is set', () => {
    session.update(
      containerTemplate.styles(BqPresentationStyles.INTRODUCTION),
    );

    expect(containerComponent.nativeElement.querySelector('.introduction')).toBeTruthy();
  });

  it('should have transparent class when presentationstyle is set', () => {
    session.update(
      containerTemplate.styles(BqPresentationStyles.TRANSPARENT),
    );

    expect(containerComponent.nativeElement.querySelector('.transparent')).toBeTruthy();
  });

  it('should be horizontal class when presentationstyle is set', () => {
    const container = containerComponent.componentInstance;
    session.update(
      containerTemplate.styles(BqPresentationStyles.HORIZONTAL),
    );

    expect(container.isHorizontal).toBe(true);
    expect(containerComponent.nativeElement.querySelector('.bq-row')).toBeTruthy();
    expect(containerComponent.nativeElement.querySelectorAll('.bq-row > *').length).toBe(3);
  });

  it('should have alignright class when presentationstyle is set', () => {
    session.update(
      containerTemplate.styles(BqPresentationStyles.ALIGNRIGHT),
    );

    expect(containerComponent.nativeElement.querySelector('.align-right')).toBeTruthy();
  });

  it('should use the bqContainer directive', () => {
    // Verify
    expect(containerComponent.debugElement.query(By.directive(BqContainerDirective))).toBeTruthy();
  });

  it('should use the bq-heading to display header', () => {
    // Verify
    expect(containerComponent.nativeElement.querySelector('bq-heading')).toBeTruthy();
  });

});
