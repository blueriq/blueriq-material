import { Input, Input } from "@angular/core";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { MomentDateTimeAdapter, OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { ElementComponent } from '../../../../generic/element/element.component';
import { MaterialModule } from '../../../material.module';
import { PresentationStyles } from '../../../presentationstyles/presentationstyles';
import { MomentTransformer } from '../moment-transformer';
import { DateTimepickerComponent } from './datetimepicker.component';
import moment = require("moment");

describe('DateTimepickerComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<DateTimepickerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimepickerComponent, ElementComponent],
      providers: [BlueriqComponents.register([DateTimepickerComponent]), MomentTransformer],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule,
        OwlDateTimeModule,
        OwlMomentDateTimeModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.datetime();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DateTimepickerComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should be a bq-element', () => {
    const bqElement = component.nativeElement.querySelector('bq-element');
    expect(bqElement).toBeTruthy();
  });

  it('should be disabled', () => {
    field.styles(PresentationStyles.DISABLED);
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

  it('first day of week with US locale is Sunday', () => {
    moment.locale('en-US');
    spyOn(MomentDateTimeAdapter.prototype, 'now').and.returnValue(moment(new Date()));
    expect(component.componentInstance.getFirstDayOfWeek()).toEqual(0);
  });

  it('first day of week with Dutch locale is Monday', () => {
    moment.locale('nl-NL');
    spyOn(MomentDateTimeAdapter.prototype, 'now').and.returnValue(moment(new Date()));
    expect(component.componentInstance.getFirstDayOfWeek()).toEqual(1);
  });

  it('default first day of week is Monday when unable to determine locale specific day of week', () => {
    spyOn(MomentDateTimeAdapter.prototype, 'now').and.throwError('error');
    expect(component.componentInstance.getFirstDayOfWeek()).toEqual(1);
  });

  it('should format on change', () => {
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DateTimepickerComponent);

    let inputField = component.nativeElement.querySelector('input');
    sendInput(inputField, '18-03-03');

     const value = component.nativeElement.querySelector('input');
     expect(value.value).toBe('2018-01-01');
  });

  function sendInput(inputField, text: string) {
    inputField.value = text;
    const event = new Event('dateTimeChange');
    inputField.dispatchEvent(event);

    component.detectChanges();
    return component.whenStable();
  }
});
