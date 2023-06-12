import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { FormControlModule } from '../../form-control.module';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<CheckboxComponent>;
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
    field = FieldTemplate.boolean();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxComponent);
  });

  it('should be changed', () => {
    // Change
    session.update(
      field.value('true'),
    );
    let inputField = component.nativeElement.querySelector('.mat-checkbox-input');
    expect(inputField.checked).toBe(true);

    // Change again
    session.update(
      field.value('false'),
    );
    inputField = component.nativeElement.querySelector('.mat-checkbox-input');
    expect(inputField.checked).toBe(false);
  });

  it('should be disabled', () => {
    field.styles(BqPresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxComponent);

    const inputField = component.nativeElement.querySelector('.mat-checkbox-disabled');
    expect(inputField).toBeTruthy();
  });
});
