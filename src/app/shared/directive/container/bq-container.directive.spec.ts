import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { BqContainerDirective } from '@shared/directive/container/bq-container.directive';
import { BqPresentationStyles } from '../../../modules/BqPresentationStyles';
import { ContainerComponent } from '../../../modules/container/container.component';
import { ContainerModule } from '../../../modules/container/container.module';

fdescribe('BqContainerDirective', () => {

  let template: ContainerTemplate;
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let session: BlueriqTestSession;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ContainerModule
      ]
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
    session.update(
      template.styles(BqPresentationStyles.INTRODUCTION)
    );
    const classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).toContain('introduction');
    expect(classes).not.toContain('card');
  });

  it('should be classed with transparent when presentation style is set', () => {
    session.update(
      template.styles(BqPresentationStyles.TRANSPARENT)
    );
    const classes = fixture.nativeElement.querySelector('div').classList;
    expect(classes).toContain('transparent');
    expect(classes).not.toContain('card');
  });

  // TODO expect(container.alignRight).toBe(true);
  // TODO bq-widget

});


