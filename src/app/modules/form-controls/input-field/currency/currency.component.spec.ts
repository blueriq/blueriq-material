import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../../../material.module';
import { CurrencyFieldComponent } from './currency.component';

describe('CurrencyFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<CurrencyFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyFieldComponent],
      providers: [BlueriqComponents.register([CurrencyFieldComponent])],
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain euro sign', () => {
    const prefix = component.nativeElement.querySelector('.mat-form-field-prefix').innerText;
    expect(prefix).toBe('euro_symbol');
  });
});
