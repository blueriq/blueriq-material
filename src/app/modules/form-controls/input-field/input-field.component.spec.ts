import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { CurrencyFieldComponent } from './currency/currency.component';
import { InputFieldComponent } from './input-field.component';

describe('InputFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<CurrencyFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyFieldComponent],
      providers: [BlueriqComponents.register([CurrencyFieldComponent]), InputFieldComponent],
      imports: [
        BrowserAnimationsModule,
        BlueriqTestingModule,
        FlexLayoutModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.currency();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CurrencyFieldComponent);
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
