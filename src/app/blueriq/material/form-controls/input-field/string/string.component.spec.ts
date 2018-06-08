import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../../generic/element/element.component';
import { MaterialModule } from '../../../material/material.module';

import { StringFieldComponent } from './string.component';

describe('StringFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<StringFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StringFieldComponent, ElementComponent],
      providers: [BlueriqComponents.register([StringFieldComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.text();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(StringFieldComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should contain explain en message support', () => {
    const appElement = component.nativeElement.querySelector('app-element');
    expect(appElement).toBeTruthy();
  });

});

