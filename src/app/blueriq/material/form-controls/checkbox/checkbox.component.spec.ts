import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../generic/element/element.component';
import { MaterialModule } from '../../material.module';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<CheckboxComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent, ElementComponent],
      providers: [BlueriqComponents.register([CheckboxComponent])],
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
    field = FieldTemplate.boolean();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be changed', () => {
    // Change
    session.update(
      field.value('true')
    );
    let inputField = component.nativeElement.querySelector('.mat-checkbox-input').getAttribute('aria-checked');
    expect(inputField).toBe('true');

    // Change again
    session.update(
      field.value('false')
    );
    inputField = component.nativeElement.querySelector('.mat-checkbox-input').getAttribute('aria-checked');
    expect(inputField).toBe('false');
  });

  it('should be disabled', () => {
    field.styles(PresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxComponent);

    const inputField = component.nativeElement.querySelector('.mat-checkbox-disabled');
    expect(inputField).toBeTruthy();
  });

});
