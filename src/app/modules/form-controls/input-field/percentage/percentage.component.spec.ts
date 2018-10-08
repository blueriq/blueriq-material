import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { PercentageFieldComponent } from './percentage.component';

describe('PercentageFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<PercentageFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PercentageFieldComponent],
      providers: [BlueriqComponents.register([PercentageFieldComponent])],
      imports: [
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FlexLayoutModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.percentage();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(PercentageFieldComponent);
  });

  it('should create PercentageFieldComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain percentage sign', () => {
    const suffix = component.nativeElement.querySelector('.mat-form-field-suffix').innerText;
    expect(suffix).toBe('%');
  });
});
