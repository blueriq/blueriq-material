import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../generic/element/element.component';
import { MaterialModule } from '../../material.module';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';
import { CurrencyFieldComponent } from './currency/currency.component';

describe('InputFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<CurrencyFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyFieldComponent, ElementComponent],
      providers: [BlueriqComponents.register([CurrencyFieldComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.currency();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CurrencyFieldComponent);
  });

  it('should contain bq-element (field wrapper)', () => {
    const appElement = component.nativeElement.querySelector('bq-element');
    expect(appElement).toBeTruthy();
  });

  it('should be disabled', () => {
    field.styles(PresentationStyles.DISABLED);
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
