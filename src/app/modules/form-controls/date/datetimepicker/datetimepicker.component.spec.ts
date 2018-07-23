import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { FieldContainerComponent } from '@shared/field-container/field-container.component';
import * as moment from 'moment';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { MomentDateTimeAdapter, OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { MaterialModule } from '../../../../material.module';
import { PresentationStyles } from '../../../PresentationStyles';
import { MomentTransformer } from '../moment-transformer';
import { DateTimepickerComponent } from './datetimepicker.component';

describe('DateTimepickerComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<DateTimepickerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimepickerComponent, FieldContainerComponent],
      providers: [BlueriqComponents.register([DateTimepickerComponent]), MomentTransformer],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule,
        FlexLayoutModule,
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
