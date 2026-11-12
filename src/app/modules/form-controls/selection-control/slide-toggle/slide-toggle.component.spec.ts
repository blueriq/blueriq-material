import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { SlideToggleComponent } from './slide-toggle.component';
import { provideFormControlComponents } from '../../form-control.providers';

describe('SlideToggleComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<SlideToggleComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [provideFormControlComponents()],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    field = FieldTemplate.boolean().styles(BqPresentationStyles.SWITCH).questionText('Setting1').explainText('Explain2');
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SlideToggleComponent);
  });

  it('should be rendered properly', () => {
    const label = component.nativeElement.querySelector('label');
    expect(label.textContent.trim()).toBe('Setting1');
    const hint = component.nativeElement.querySelector('mat-hint');
    expect(hint.textContent.trim()).toBe('Explain2');
    const inputField = component.nativeElement.querySelector('.mdc-switch--checked');
    expect(inputField).toBeFalsy();
  });

  it('should be changed', () => {
    session.update(
      field.value('true'),
    );
    let inputField = component.nativeElement.querySelector('.mdc-switch--checked');
    expect(inputField).toBeTruthy();

    session.update(
      field.value('false'),
    );
    inputField = component.nativeElement.querySelector('.mdc-switch--unselected');
    expect(inputField).toBeTruthy();
  });

  it('should be disabled', () => {
    field.styles(BqPresentationStyles.SWITCH, BqPresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SlideToggleComponent);

    const inputField = component.nativeElement.querySelector('.mdc-switch--unselected');
    expect(inputField).toBeTruthy();
  });

});
