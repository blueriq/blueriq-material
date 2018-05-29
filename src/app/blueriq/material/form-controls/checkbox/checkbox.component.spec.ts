///<reference path="../../../../../../node_modules/@types/jasminewd2/index.d.ts"/>
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

  it('should be created', () => {
    const session = BlueriqSessionTemplate.create().build(field);
    const component = session.get(CheckboxComponent);
    expect(component).toBeTruthy();
  });

  it('should be changed', () => {
    const session = BlueriqSessionTemplate.create().build(field);
    const component = session.get(CheckboxComponent);

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

});
