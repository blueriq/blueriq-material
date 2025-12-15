import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { FormControlModule } from '../../form-control.module';
import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<DatepickerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    field = FieldTemplate.date().styles(BqPresentationStyles.DATEPICKERMATERIAL);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DatepickerComponent);
  });

  it('should have a hint', () => {
    session.update(
      field.explainText('explaining it'),
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-hint').innerHTML).toContain('explaining it');
  });

  it('should have a placeholder', () => {
    session.update(
      field.placeholder('myPlaceholder'),
    );
    expect(component.nativeElement.querySelector('input[placeholder]')).toBeTruthy();
    expect(component.nativeElement.querySelector('input').getAttribute('placeholder')).toBe('myPlaceholder');
  });

  it('should have an error', () => {
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();
    component.componentInstance.formControl.markAsTouched();
    component.detectChanges();
    session.update(
      field.error('wrong IBAN'),
    );
    expect(component.nativeElement.querySelector('mat-error')).toBeTruthy();
  });

  it('should have an error because of wrong date input', () => {
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();

    // note: contrary to blueriq errors (messages) which are handled by the runtime,
    // invalid dates are handled by the component itself, so we need to actually send
    // some input rather than update the session
    const input = component.debugElement.query(By.css('input'));
    const inputElement = input.nativeElement;

    expect(inputElement.value).toBe('');

    inputElement.value = 'this is not a date';
    inputElement.dispatchEvent(new Event('input'));

    component.componentInstance.formControl.markAsTouched();
    component.detectChanges();
    component.whenStable().then(() => {
      const errorElement = component.nativeElement.querySelector('mat-error');
      expect(errorElement).toBeTruthy();
      expect(errorElement.innerText).toBe('invalid input');
    });
  });

  it('should be disabled', () => {
    field.styles(BqPresentationStyles.DISABLED, BqPresentationStyles.DATEPICKERMATERIAL);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DatepickerComponent);

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });

  it('should be read only', () => {
    field.readonly();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DatepickerComponent);

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });
});
