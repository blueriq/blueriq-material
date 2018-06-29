import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../../generic/element/element.component';
import { MaterialModule } from '../../../material.module';
import { IntegerFieldComponent } from './integer.component';

describe('IntegerFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<IntegerFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntegerFieldComponent, ElementComponent],
      providers: [BlueriqComponents.register([IntegerFieldComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FlexLayoutModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.integer();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(IntegerFieldComponent);
  });

  it('should create IntegerFieldComponent', () => {
    expect(component).toBeTruthy();
  });
});
