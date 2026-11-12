import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { IntegerFieldComponent } from './integer.component';
import { provideFormControlComponents } from '../../form-control.providers';

describe('IntegerFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<IntegerFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [provideFormControlComponents()],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    field = FieldTemplate.integer();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(IntegerFieldComponent);
  });

  it('should create IntegerFieldComponent', () => {
    expect(component).toBeTruthy();
  });
});
