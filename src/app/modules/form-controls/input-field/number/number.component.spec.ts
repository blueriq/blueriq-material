import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { NumberFieldComponent } from './number.component';
import { provideFormControlComponents } from '../../form-control.providers';

describe('NumberFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<NumberFieldComponent>;
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
    field = FieldTemplate.number();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(NumberFieldComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
