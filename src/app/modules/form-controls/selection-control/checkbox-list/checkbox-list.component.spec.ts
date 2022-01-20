import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { FormControlModule } from '../../form-control.module';
import { CheckboxListComponent } from './checkbox-list.component';

describe('CheckboxListComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<CheckboxListComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    field = FieldTemplate.text('muppets')
    .readonly(false)
    .domain({
      'kermit': 'Kermit',
      'miss_piggy': 'Miss Piggy',
      'beaker': 'Beaker',
    })
    .required(true)
    .value([]);
  });

  it('direction is `horizontal` with PS \'Horizontal\'', () => {
    field.styles(BqPresentationStyles.ALLOPTIONSVISIBLE, BqPresentationStyles.HORIZONTAL);

    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxListComponent);

    const checkboxContainer = component.nativeElement.querySelector('mat-checkbox').parentElement;
    expect(checkboxContainer.style.flexDirection).toBe('row');
  });

  it('direction is `vertical` without PS \'Horizontal\'', () => {
    field.styles(BqPresentationStyles.ALLOPTIONSVISIBLE);

    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxListComponent);

    const checkboxContainer = component.nativeElement.querySelector('mat-checkbox').parentElement;
    expect(checkboxContainer.style.flexDirection).toBe('column');
  });

  it('should be disabled', () => {
    field.styles(BqPresentationStyles.ALLOPTIONSVISIBLE, BqPresentationStyles.DISABLED);

    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxListComponent);

    const inputField = component.nativeElement.querySelector('.mat-checkbox-disabled');
    expect(inputField).toBeTruthy();
  });

  it('should be disabled `horizonal`', () => {
    field.styles(BqPresentationStyles.ALLOPTIONSVISIBLE, BqPresentationStyles.DISABLED, BqPresentationStyles.HORIZONTAL);

    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxListComponent);

    const inputField = component.nativeElement.querySelector('.mat-checkbox-disabled');
    expect(inputField).toBeTruthy();
    const checkboxContainer = component.nativeElement.querySelector('mat-checkbox').parentElement;
    expect(checkboxContainer.style.flexDirection).toBe('row');
  });

  it('should be changed', () => {
    field.styles(BqPresentationStyles.ALLOPTIONSVISIBLE, BqPresentationStyles.HORIZONTAL);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxListComponent);

    // Change
    session.update(
      field.value(['kermit']),
    );

    let checkboxes = component.nativeElement.querySelectorAll('mat-checkbox');
    expect(getChecked(checkboxes, 0)).toBeTrue();
    expect(getChecked(checkboxes, 1)).toBeFalse();
    expect(getChecked(checkboxes, 2)).toBeFalse();

    // Change
    session.update(
      field.value(['kermit', 'beaker']),
    );

    checkboxes = component.nativeElement.querySelectorAll('mat-checkbox');
    expect(getChecked(checkboxes, 0)).toBeTrue();
    expect(getChecked(checkboxes, 1)).toBeFalse();
    expect(getChecked(checkboxes, 2)).toBeTrue();
  });

  it('should update field when checkbox is checked', () => {
    field.styles(BqPresentationStyles.ALLOPTIONSVISIBLE, BqPresentationStyles.HORIZONTAL);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxListComponent);

    expect(component.componentInstance.formControl.value).toEqual([]);

    component.debugElement.query(By.css('mat-checkbox label')).nativeElement.click();
    component.detectChanges();

    expect(component.componentInstance.formControl.value).toEqual(['kermit']);
  });

  it('should update field when checkbox is unchecked', () => {
    field.styles(BqPresentationStyles.ALLOPTIONSVISIBLE, BqPresentationStyles.HORIZONTAL);
    field.value(['kermit']);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(CheckboxListComponent);

    expect(component.componentInstance.formControl.value).toEqual(['kermit']);

    component.debugElement.query(By.css('mat-checkbox label')).nativeElement.click();
    component.detectChanges();

    expect(component.componentInstance.formControl.value).toEqual([]);
  });

  function getChecked(elements: NodeListOf<Element>, index: number): boolean {
    return elements.item(index).querySelector('input')!.checked;
  }
});
