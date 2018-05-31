import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material/material.module';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  const field = FieldTemplate.boolean();
  let component;
  let session;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
      providers: [BlueriqComponents.register([CheckboxComponent])],
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
    component = session.get(CheckboxComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be changed', () => {
    // Change
    session.update(
      field.value('true')
    );
    let inputField = component.nativeElement.querySelector('.mat-checkbox-input').getAttribute('aria-checked');
    expect(inputField).toBe('true');

    // Change again
    session.update(
      field.value('false')
    );
    inputField = component.nativeElement.querySelector('.mat-checkbox-input').getAttribute('aria-checked');
    expect(inputField).toBe('false');
  });

  it('should be disabled', () => {
    field.styles(PresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxComponent);

    const inputField = component.nativeElement.querySelector('.mat-checkbox-disabled');
    expect(inputField).toBeTruthy();
  });

});
