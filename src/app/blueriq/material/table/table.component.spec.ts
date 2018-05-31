import { async, TestBed } from '@angular/core/testing';

import {ElementComponent} from './element.component';
import {BlueriqSessionTemplate, BlueriqTestingModule} from '@blueriq/angular/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material/material/material.module';
import {FieldTemplate} from '@blueriq/core/testing';
import {BlueriqComponents, BlueriqModule} from '@blueriq/angular';
import {FormsModule} from '@angular/forms';
import {TableComponent} from './table.component';

describe('ElementComponent', () => {

  const field = FieldTemplate.text();
  let session;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [BlueriqComponents.register([TableComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqModule.forRoot(),
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach( () => {
    // Create a ElementComponent  based on a fieldComponent.
    // FieldComponent is used, but any component that has a field should work
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(TableComponent);
  });

  it('should contain the FieldComponent', () => {
    let selectedElement = component.nativeElement.querySelector('.col1').querySelector('.mat-form-field');
    expect(selectedElement).toBeTruthy();
  });

});
