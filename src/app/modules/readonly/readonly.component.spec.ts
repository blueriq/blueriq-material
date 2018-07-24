import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { FormattingModule } from '@blueriq/angular/formatting';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material.module';

import { ReadonlyComponent } from './readonly.component';

describe('ReadonlyComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<ReadonlyComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadonlyComponent],
      providers: [BlueriqComponents.register([ReadonlyComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule,
        FormattingModule.forRoot()
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.integer().readonly();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(ReadonlyComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
