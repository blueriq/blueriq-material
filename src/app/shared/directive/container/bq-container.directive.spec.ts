import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { BqContainerDirective } from '@shared/directive/container/bq-container.directive';
import { BqContentStyles } from '../../../modules/BqContentStyles';
import { BqPresentationStyles } from '../../../modules/BqPresentationStyles';
import { ContainerComponent } from '../../../modules/container/container.component';
import { ContainerModule } from '../../../modules/container/container.module';

describe('BqContainerDirective', () => {

  let template: ContainerTemplate;
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let session: BlueriqTestSession;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ContainerModule,
      ],
    });
  });

  beforeEach(() => {
    template = ContainerTemplate.create().displayName('UserData');
    session = BlueriqSessionTemplate.create().build(template);
    fixture = session.get(ContainerComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should by default be a card container', () => {
    const classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).toContain('card');
    expect(classes).not.toContain('introduction');
    expect(classes).not.toContain('transparent');
  });

  it('should by have a top-container class since it is the root element', () => {
    const classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).toContain('top-container');
  });

  it('should be classed with introduction when presentation style is set', () => {
    let classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).not.toContain('introduction');
    session.update(
      template.styles(BqPresentationStyles.INTRODUCTION),
    );
    classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).toContain('introduction');
    expect(classes).not.toContain('card');
    expect(classes).not.toContain('transparent');
  });

  it('should be classed with transparent when presentation style is set', () => {
    let classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).not.toContain('transparent');
    session.update(
      template.styles(BqPresentationStyles.TRANSPARENT),
    );
    classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).toContain('transparent');
    expect(classes).not.toContain('card');
    expect(classes).not.toContain('introduction');
  });

  it('should be classed with align-right when presentation style is set', () => {
    let classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).not.toContain('align-right');
    session.update(
      template.styles(BqPresentationStyles.ALIGNRIGHT),
    );
    classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).toContain('align-right');
  });

  it('should be classed with bq-widget when contentstyle is set', () => {
    let classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).not.toContain('bq-widget');
    // Dashboard widget
    session.update(
      template.contentStyle(BqContentStyles.DASHBOARD_WIDGET),
    );
    classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).toContain('bq-widget');
    // or Dashboard flow widget
    session.update(
      template.contentStyle(BqContentStyles.DASHBOARD_FLOWWIDGET),
    );
    classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).toContain('bq-widget');
  });
});


