import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { StringFieldComponent } from '../../material/form-controls/string-field/string-field.component';
import { MaterialModule } from '../../material/material/material.module';

import { ElementComponent } from './element.component';

describe('ElementComponent', () => {

  const field = FieldTemplate.text();
  let session;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StringFieldComponent, ElementComponent],
      providers: [BlueriqComponents.register([StringFieldComponent])],
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
    // Create a ElementComponent  based on a fieldComponent.
    // FieldComponent is used, but any component that has a field should work
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(StringFieldComponent);
  });

  it('should contain the FieldComponent', () => {
    const selectedElement = component.nativeElement.querySelector('.col1').querySelector('.mat-form-field');
    expect(selectedElement).toBeTruthy();
  });

  it('should display explainText, if any', () => {
    let selectedElement = component.nativeElement.querySelector('.col2').innerHTML;
    expect(selectedElement).not.toContain('some explain text');

    session.update(
      field.explainText('some explain text')
    );
    selectedElement = component.nativeElement.querySelector('.col2').innerHTML;
    expect(selectedElement).toContain('some explain text');

  });

  it('should display messages, if any', () => {
    session.update(
      field.error('wrong IBAN'), field.error('wrong length'), field.warning('Some warning')
    );

    const selectedElements = component.nativeElement.querySelector('.col1').querySelectorAll('mat-error');
    expect(selectedElements.length).toBe(3);
    expect(selectedElements[0].innerHTML).toContain('wrong IBAN');
    expect(selectedElements[1].innerHTML).toContain('wrong length');
    expect(selectedElements[2].innerHTML).toContain('Some warning');
  });

});
