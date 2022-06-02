import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { FormControlModule } from '../../form-control.module';

import { StringFieldComponent } from './string.component';

describe('StringFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<StringFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    field = FieldTemplate.text();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(StringFieldComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have type text', () => {
    const inputField = component.nativeElement.querySelector('input');

    expect(inputField).toBeTruthy();
    expect(inputField.getAttribute('type')).toBe('text');
  });

  it('should have type password', () => {
    field.styles(BqPresentationStyles.PASSWORD);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(StringFieldComponent);

    const inputField = component.nativeElement.querySelector('input');

    expect(inputField).toBeTruthy();
    expect(inputField.getAttribute('type')).toBe('password');
  });
});

