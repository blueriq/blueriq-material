import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material.module';
import { StringFieldComponent } from '../../modules/form-controls/input-field/string/string.component';
import { PresentationStyles } from '../../modules/PresentationStyles';

import { FieldContainerComponent } from './field-container.component';

describe('FieldContainerComponent', () => {

  let field: FieldTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<StringFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StringFieldComponent, FieldContainerComponent],
      providers: [BlueriqComponents.register([StringFieldComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        FlexLayoutModule,
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    // Create a FieldContainerComponent  based on a StringFieldComponent.
    // StringFieldComponent is used, but any component that has a field should work
    field = FieldTemplate.text();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(StringFieldComponent);
  });

  it('should contain the FieldComponent', () => {
    const selectedElement = component.nativeElement.querySelector('.mat-form-field');
    expect(selectedElement).toBeTruthy();
  });

  it('should display explain text, if any', () => {
    let selectedElement = component.nativeElement.querySelector('mat-hint').innerHTML;
    expect(selectedElement).not.toContain('some explain text');

    session.update(
      field.explainText('some explain text')
    );
    selectedElement = component.nativeElement.querySelector('mat-hint').innerHTML;
    expect(selectedElement).toContain('some explain text');
  });

  it('should display explain icon, if any', () => {
    let selectedElement = component.nativeElement.querySelector('.material-icons');
    expect(selectedElement).toBeFalsy();

    session.update(
      field.styles(PresentationStyles.EXPLAINICON),
      field.explainText('some explain text')
    );
    selectedElement = component.nativeElement.querySelector('.material-icons[ng-reflect-message]');
    expect(selectedElement).toBeTruthy();
    expect(selectedElement.getAttribute('ng-reflect-message')).toBe('some explain text');
  });

  it('should not display explain icon when readonly', () => {
    session.update(
      field.styles(PresentationStyles.EXPLAINICON),
      field.readonly(true)
    );
    const selectedElement = component.nativeElement.querySelector('.material-icons[ng-reflect-message]');
    expect(selectedElement).toBeFalsy();
  });

  it('should display messages, if any', () => {
    session.update(
      field.error('wrong IBAN'), field.error('wrong length'), field.warning('Some warning')
    );

    const selectedElements = component.nativeElement.querySelectorAll('mat-error');
    expect(selectedElements.length).toBe(3);
    expect(selectedElements[0].innerHTML).toContain('wrong IBAN');
    expect(selectedElements[1].innerHTML).toContain('wrong length');
    expect(selectedElements[2].innerHTML).toContain('Some warning');
  });

});
