import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { FormControlModule } from '../form-control.module';
import { TextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<TextAreaComponent>;
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
    field = FieldTemplate.text().styles(BqPresentationStyles.LARGETEXT);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(TextAreaComponent);
  });

  it('should have been created', () => {
    expect(component).toBeTruthy();
  });

  it('should have been created with old presentation style memo', () => {
    session.update(
      field.styles(BqPresentationStyles.MEMO)
    );
    expect(component).toBeTruthy();
  });

  it('should have a hint', () => {
    session.update(
      field.explainText('explaining it')
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-hint').innerHTML).toContain('explaining it');
  });

  it('should have a error', () => {
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();
    component.componentInstance.formControl.markAsTouched();
    component.detectChanges();
    session.update(
      field.required(true),
      field.error('wrong IBAN')
    );
    expect(component.nativeElement.querySelector('mat-error')).toBeTruthy();
  });

  it('should be disabled', () => {
    session.update(
      field.styles(BqPresentationStyles.DISABLED)
    );
    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });

  it('should be read only', () => {
    session.update(
      field.readonly()
    );

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });
});
