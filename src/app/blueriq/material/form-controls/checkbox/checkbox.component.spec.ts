import { async, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';

describe('CheckboxComponent', () => {
  const field = FieldTemplate.boolean();
  let component;
  let session;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxComponent ],
      providers: [ BlueriqComponents.register([CheckboxComponent])],
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
    field.styles('Disabled');
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxComponent);

    let inputField = component.nativeElement.querySelector('.mat-checkbox-disabled');
    expect(inputField).toBeTruthy();
  });

});
