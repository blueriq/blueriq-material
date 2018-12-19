import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { FormControlModule } from '../../form-control.module';

import { StringFieldComponent } from './string.component';

describe('StringFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<StringFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule,
      ],
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
});

