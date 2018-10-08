import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { FormControlModule } from '../../form-control.module';
import { PercentageFieldComponent } from './percentage.component';

describe('PercentageFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<PercentageFieldComponent>;
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
