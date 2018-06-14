import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../generic/element/element.component';
import { MomentTransformer } from '../../datetime/datetime';
import { MaterialModule } from '../../material/material.module';

import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<DatepickerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent, ElementComponent],
      providers: [BlueriqComponents.register([DatepickerComponent]), MomentTransformer],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.date();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DatepickerComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be an app-element', () => {
    const appElement = component.nativeElement.querySelector('app-element');
    expect(appElement).toBeTruthy();
  });

});
