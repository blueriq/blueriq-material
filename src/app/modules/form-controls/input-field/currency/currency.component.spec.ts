import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { FormControlModule } from '../../form-control.module';
import { CurrencyFieldComponent } from './currency.component';

describe('CurrencyFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<CurrencyFieldComponent>;
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
    field = FieldTemplate.currency();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CurrencyFieldComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain euro sign', () => {
    const prefix = component.nativeElement.querySelector('.mat-form-field-prefix').innerText;
    expect(prefix.trim()).toBe('euro_symbol');
  });
});
