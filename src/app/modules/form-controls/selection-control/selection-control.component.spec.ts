import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectionControlComponent } from './selection-control.component';

describe('SelectionControlComponent', () => {

  let field: FieldTemplate;
  let component: ComponentFixture<CheckboxComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent, SelectionControlComponent],
      providers: [BlueriqComponents.register([CheckboxComponent])],
      imports: [
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FlexLayoutModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.boolean();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display hint', () => {
    session.update(
      field.explainText('explaintext')
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();
    expect(component.nativeElement.querySelector('mat-hint').innerHTML).toBe('explaintext');
  });

  it('should display errors', () => {
    // component.componentInstance.formControl.markAsTouched();
    // component.detectChanges();
    session.update(
      field.error('someError')
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeFalsy();
    expect(component.nativeElement.querySelector('mat-error')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-error').innerHTML).toBe('someError');
  });

});
