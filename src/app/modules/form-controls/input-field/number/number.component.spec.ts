import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { FieldContainerComponent } from '@shared/field-container/field-container.component';
import { MaterialModule } from '../../../../material.module';
import { NumberFieldComponent } from './number.component';

describe('NumberFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<NumberFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumberFieldComponent, FieldContainerComponent],
      providers: [BlueriqComponents.register([NumberFieldComponent])],
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
    field = FieldTemplate.number();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(NumberFieldComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
