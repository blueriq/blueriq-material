import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../../generic/element/element.component';
import { MaterialModule } from '../../../material/material.module';
import { PercentageFieldComponent } from './percentage.component';

describe('PercentageFieldComponent', () => {
  let field;
  let component;
  let session;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PercentageFieldComponent, ElementComponent],
      providers: [BlueriqComponents.register([PercentageFieldComponent])],
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
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(PercentageFieldComponent);
    field = FieldTemplate.text();
  });

  it('should create PercentageFieldComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain percentage sign', () => {
    const suffix = component.nativeElement.querySelector('mat-form-field').innerHTML;
    expect(suffix).toContain('matsuffix');
  });
});
