import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { FormControlModule } from '../../form-control.module';
import { DateTimepickerComponent } from './datetimepicker.component';

describe('DateTimepickerComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<DateTimepickerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.datetime();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DateTimepickerComponent);
  });

  it('should render date and time picker for datetime fields', () => {
    expect(component.componentInstance.getPickerType()).toEqual('both');
  });

  it('should render only datepicker for date fields', () => {
    field = FieldTemplate.date();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DateTimepickerComponent);
    expect(component.componentInstance.getPickerType()).toEqual('calendar');
  });

  it('should have a hint', () => {
    session.update(
      field.explainText('explaining it')
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-hint').innerHTML).toContain('explaining it');
  });

  it('should have a placeholder', () => {
    session.update(
      field.placeholder('myPlaceholder')
    );
    expect(component.nativeElement.querySelector('input[placeholder]')).toBeTruthy();
    expect(component.nativeElement.querySelector('input').getAttribute('placeholder')).toBe('myPlaceholder');
  });

  it('should have an error', () => {
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();
    component.componentInstance.formControl.markAsTouched();
    component.detectChanges();
    session.update(
      field.error('wrong IBAN')
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
    component.whenStable()
    .then(() => {
      const errorElement = component.nativeElement.querySelector('mat-error');
      expect(errorElement).toBeTruthy();
      expect(errorElement.innerText).toBe('invalid input');
    });
  });

  it('should be disabled', () => {
    field.styles(BqPresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DateTimepickerComponent);

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });

  it('should be read only', () => {
    field.readonly();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DateTimepickerComponent);

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });

  it('should verify that on change triggers the formatOnChange function', () => {
    // Init
    spyOn(DateTimepickerComponent.prototype, 'formatOnChange');
    const inputField = component.nativeElement.querySelector('input');

    // SUT
    inputField.dispatchEvent(new Event('dateTimeChange'));

    // Verify
    expect(component.componentInstance.formatOnChange).toHaveBeenCalled();
  });

  it('should have the formatOnChange event changing the event source value from event.value', () => {
    // Init
    const datetimePickerComponent: DateTimepickerComponent = component.componentInstance;
    let eventJson: any = {
      value: '18-01-02', // from
      source: {
        value: '' // to
      }
    };

    // SUT
    datetimePickerComponent.formatOnChange(eventJson);

    // Verify
    expect(eventJson.source.value).toBe(eventJson.value);

    // Init
    eventJson = {
      value: null, // from
      source: {
        value: '' // to
      }
    };

    // SUT
    datetimePickerComponent.formatOnChange(eventJson);

    // Verify
    expect(eventJson.source.value).not.toBe(eventJson.value);
  });
});
