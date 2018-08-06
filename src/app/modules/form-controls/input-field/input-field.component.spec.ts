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

describe('InputFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<CurrencyFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyFieldComponent],
      providers: [BlueriqComponents.register([CurrencyFieldComponent]), InputFieldComponent],
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
    field = FieldTemplate.currency();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CurrencyFieldComponent);
    component.autoDetectChanges();
  });

  it('should have a hint', () => {
    session.update(
      field.explainText('explaining it')
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-hint').innerHTML).toContain('explaining it');
  });

  // TODO WIP
  xit('should have a error', () => {
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();
    session.update(
      field.error('wrong IBAN'), field.error('wrong length'), field.warning('Some warning')
    );

    // Weg klikken
    keyPress();
    let somethingelse = component.nativeElement.querySelector('p');
    somethingelse.click();

    component.whenStable()
    .then(() => {
      console.log(component.nativeElement.querySelector('mat-error'));
    });
    component.whenRenderingDone()
    .then(() => {
      console.log(component.nativeElement.querySelector('mat-error'));
    });
    // expect(component.nativeElement.querySelector('mat-error')).toBeTruthy();
  });

  function keyPress() {
    const event = document.createEvent('Event');
    event.initEvent('keydown', false, false);
    document.dispatchEvent(event);
  }

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
