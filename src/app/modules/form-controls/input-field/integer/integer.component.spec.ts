import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { FormControlModule } from '../../form-control.module';
import { IntegerFieldComponent } from './integer.component';

describe('IntegerFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<IntegerFieldComponent>;
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
    field = FieldTemplate.integer();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(IntegerFieldComponent);
  });

  it('should create IntegerFieldComponent', () => {
    expect(component).toBeTruthy();
  });
});
