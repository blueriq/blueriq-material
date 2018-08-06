import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../../../material.module';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { MomentTransformer } from '../moment-transformer';
import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<DatepickerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent],
      providers: [BlueriqComponents.register([DatepickerComponent]), MomentTransformer],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FlexLayoutModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.date().styles(BqPresentationStyles.DATEPICKERMATERIAL);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DatepickerComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hint and errors', () => {
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-error')).toBeTruthy();
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
