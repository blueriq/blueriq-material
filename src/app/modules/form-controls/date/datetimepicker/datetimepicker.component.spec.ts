import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate, LocalizationTemplate } from '@blueriq/core/testing';
import { OWL_DATE_TIME_LOCALE, OwlDateTimeIntl } from '@danielmoncada/angular-datetime-picker';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { FormControlModule } from '../../form-control.module';
import { DateTimepickerComponent } from './datetimepicker.component';

describe('DateTimepickerComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<DateTimepickerComponent>;
  let fixture: ComponentFixture<DateTimepickerComponent>;
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

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
      fixture = undefined!;
    }
  });

  beforeEach(async() => {
    field = FieldTemplate.datetime();
    session = BlueriqSessionTemplate.create().build(field);
  });

  it('should render date and time picker for datetime fields', () => {
    component = session.get(DateTimepickerComponent);
    fixture = component;
    expect(component.componentInstance.getPickerType()).toEqual('both');
  });

  it('should render only datepicker for date fields', () => {
    field = FieldTemplate.date();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DateTimepickerComponent);
    fixture = component;
    expect(component.componentInstance.getPickerType()).toEqual('calendar');
  });

  it('should be localized according to the session locale', () => {
    session = BlueriqSessionTemplate.create().configure(s => {
      s.language(LocalizationTemplate.create().languageCode('nl-NL'));
    }).build(field);
    component = session.get(DateTimepickerComponent);
    fixture = component;
    component.detectChanges();

    const locale = fixture.debugElement.injector.get(OWL_DATE_TIME_LOCALE);
    expect(locale).toBe('nl-NL');

    const intl = fixture.debugElement.injector.get(OwlDateTimeIntl);
    expect(intl.cancelBtnLabel).toBe('Annuleer');
  });

  it('should fallback to en-US when the requested locale is not available', () => {
    session = BlueriqSessionTemplate.create().configure(s => {
      s.language(LocalizationTemplate.create().languageCode('de-DE'));
    }).build(field);
    component = session.get(DateTimepickerComponent);
    fixture = component;
    component.detectChanges();

    const locale = fixture.debugElement.injector.get(OWL_DATE_TIME_LOCALE);
    expect(locale).toBe('de-DE');

    const intl = fixture.debugElement.injector.get(OwlDateTimeIntl);
    expect(intl.cancelBtnLabel).toBe('Cancel');
  });

  it('should have a hint', () => {
    component = session.get(DateTimepickerComponent);
    fixture = component;
    session.update(
      field.explainText('explaining it'),
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-hint').innerHTML).toContain('explaining it');
  });

  it('should have a placeholder', () => {
    component = session.get(DateTimepickerComponent);
    fixture = component;
    session.update(
      field.placeholder('myPlaceholder'),
    );
    expect(component.nativeElement.querySelector('input[placeholder]')).toBeTruthy();
    expect(component.nativeElement.querySelector('input').getAttribute('placeholder')).toBe('myPlaceholder');
  });

  it('should have an error', () => {
    component = session.get(DateTimepickerComponent);
    fixture = component;
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();
    component.componentInstance.formControl.markAsTouched();
    component.detectChanges();
    session.update(
      field.error('wrong IBAN'),
    );
    expect(component.nativeElement.querySelector('mat-error')).toBeTruthy();
  });

  it('should have an error because of wrong date input', () => {
    component = session.get(DateTimepickerComponent);
    fixture = component;
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
    fixture = component;

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });

  it('should be read only', () => {
    field.readonly();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DateTimepickerComponent);
    fixture = component;

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });

  it('should verify that on change triggers the formatOnChange function', () => {
    component = session.get(DateTimepickerComponent);
    fixture = component;
    // Init
    spyOn(DateTimepickerComponent.prototype, 'formatOnChange');
    const inputField = component.nativeElement.querySelector('input');

    // SUT
    inputField.dispatchEvent(new Event('dateTimeChange'));

    // Verify
    expect(component.componentInstance.formatOnChange).toHaveBeenCalled();
  });

  it('should have the formatOnChange event changing the event source value from event.value', () => {
    component = session.get(DateTimepickerComponent);
    fixture = component;
    // Init
    const datetimePickerComponent: DateTimepickerComponent = component.componentInstance;
    let eventJson: any = {
      value: '18-01-02', // from
      source: {
        value: '', // to
      },
    };

    // SUT
    datetimePickerComponent.formatOnChange(eventJson);

    // Verify
    expect(eventJson.source.value).toBe(eventJson.value);

    // Init
    eventJson = {
      value: null, // from
      source: {
        value: '', // to
      },
    };

    // SUT
    datetimePickerComponent.formatOnChange(eventJson);

    // Verify
    expect(eventJson.source.value).not.toBe(eventJson.value);
  });
});
