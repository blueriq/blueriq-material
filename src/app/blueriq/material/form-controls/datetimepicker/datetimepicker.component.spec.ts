import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { ElementComponent } from '../../../generic/element/element.component';
import { MomentTransformer } from '../../../generic/moment/moment-transfer';
import { MaterialModule } from '../../material/material.module';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';

import { DateTimepickerComponent } from './datetimepicker.component';

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
});
