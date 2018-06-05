import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../../generic/element/element.component';
import { MaterialModule } from '../../../material/material.module';
import { IntegerFieldComponent } from './integer.component';

describe('IntegerFieldComponent', () => {
  const field = FieldTemplate.integer();
  let component;
  let session;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntegerFieldComponent, ElementComponent],
      providers: [BlueriqComponents.register([IntegerFieldComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqModule.forRoot(),
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(IntegerFieldComponent);
  });

  it('should create IntegerFieldComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should validate integer, not validate float', () => {
    // Change
    session.update(
      field.value('1'),
      field.warning('Invalid integer')
    );

    let inputField = component.nativeElement.querySelector('.mat-form-field').innerHTML;
    expect(inputField).not.toContain('mat-error');

    session.update(
      field.value('1.2')
    );
    inputField = component.nativeElement.querySelector('.mat-form-field').innerHTML;
    expect(inputField).toContain('mat-error');
  });
});
