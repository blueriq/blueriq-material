import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../../material.module';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { CurrencyFieldComponent } from './currency/currency.component';
import { InputFieldComponent } from './input-field.component';
import { TextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<TextAreaComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextAreaComponent],
      providers: [BlueriqComponents.register([TextAreaComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        BlueriqTestingModule,
        FlexLayoutModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.text().styles(BqPresentationStyles.LARGETEXT);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(TextAreaComponent);
  });

  it('should have been created', () => {
    expect(component).toBeTruthy();
  });

  it('should have been created with old presentation style memo', () => {
    session.update(
      field.styles(BqPresentationStyles.MEMO)
    );
    expect(component).toBeTruthy();
  });

  it('should have a hint', () => {
    session.update(
      field.explainText('explaining it')
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-hint').innerHTML).toContain('explaining it');
  });

  it('should have a error', () => {
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();
    component.componentInstance.formControl.markAsTouched();
    component.detectChanges();
    session.update(
      field.required(true),
      field.error('wrong IBAN')
    );
    expect(component.nativeElement.querySelector('mat-error')).toBeTruthy();
  });

  it('should be disabled', () => {
    field.styles(BqPresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CurrencyFieldComponent);

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });

  it('should be read only', () => {
    field.readonly();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CurrencyFieldComponent);

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });
});
