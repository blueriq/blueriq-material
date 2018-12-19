import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { FormControlModule } from '../../form-control.module';
import { NumberFieldComponent } from './number.component';

describe('NumberFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<NumberFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule,
      ],
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.number();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(NumberFieldComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
