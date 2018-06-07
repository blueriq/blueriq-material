import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../../generic/element/element.component';
import { MaterialModule } from '../../../material/material.module';
import { PercentageFieldComponent } from './percentage.component';

describe('PercentageFieldComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<PercentageFieldComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PercentageFieldComponent, ElementComponent],
      providers: [BlueriqComponents.register([PercentageFieldComponent])],
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
    component = session.get(PercentageFieldComponent);
  });

  it('should create PercentageFieldComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain percentage sign', () => {
    const suffix = component.nativeElement.querySelector('mat-form-field').innerHTML;
    expect(suffix).toContain('matsuffix');
  });
});
