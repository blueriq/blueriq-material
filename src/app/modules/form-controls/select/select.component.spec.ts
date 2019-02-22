import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { FormControlModule } from '../form-control.module';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let field: FieldTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<SelectComponent>;
  let _containerElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule,
      ],
    });
    inject([OverlayContainer], (oc: OverlayContainer) => {
      _containerElement = oc.getContainerElement();
    })();
  });

  beforeEach(() => {
    field = FieldTemplate.text('colour').domain({
      'blue': 'Blue',
      'pink': 'Pink',
      'white': 'White',
    });
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);
  });

  it('should show a disabled option if the current value is not within the domain', async() => {
    session.update(
      field.value('unavailable'),
    );

    await openOverlay();
    const selectOptions = getMatOptionsFromOverlay();

    expect(selectOptions.length).toBe(5);

    const unavailableOption = selectOptions[4];
    expect(unavailableOption.innerText).toContain('unavailable');
    expect(unavailableOption.classList.contains('mat-option-disabled')).toBe(true);
  });

  it('should be disabled', () => {
    let selectDisabled = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectDisabled).toBeFalsy();

    session.update(
      field.styles(BqPresentationStyles.DISABLED),
    );

    selectDisabled = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectDisabled).toBeTruthy();
  });

  it('should be read only', () => {
    let selectReadonly = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectReadonly).toBeFalsy();

    session.update(
      field.readonly(true),
    );

    selectReadonly = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectReadonly).toBeTruthy();
  });

  it('should have a hint', () => {
    session.update(
      field.explainText('explaining it'),
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-hint').innerHTML).toContain('explaining it');
  });

  it('should have a placeholder', () => {
    session.update(
      field.placeholder('myPlaceholder'),
    );
    expect(component.nativeElement.querySelector('.mat-select-placeholder')).toBeTruthy();
    expect(component.nativeElement.querySelector('.mat-select-placeholder').innerText).toBe('myPlaceholder');
  });

  it('should have an error', () => {
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();
    component.componentInstance.formControl.markAsTouched();
    component.detectChanges();
    session.update(
      field.required(true),
      field.error('wrong IBAN'),
    );
    expect(component.nativeElement.querySelector('mat-error')).toBeTruthy();
  });

  it('should select one value', () => {
    let selectedOneValue = component.nativeElement.querySelector('.mat-select-value-text');
    expect(selectedOneValue).toBeNull();

    session.update(
      field.value('blue'),
    );

    selectedOneValue = component.nativeElement.querySelector('.mat-select-value-text').innerText;
    expect(selectedOneValue).toBe('Blue');
  });

  it('should only have one mat-select', () => {
    const selectList = component.nativeElement.querySelectorAll('mat-select') as NodeListOf<HTMLElement>;
    expect(selectList.length).toBe(1);
  });

  it('should have more values selected', async() => {
    // Fully re-initialize as the select cannot switch from single to multi-mode.
    field.value(['blue', 'pink', 'white']);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);

    await component.whenStable();
    component.detectChanges();

    const selectValue = component.nativeElement.querySelector('.mat-select-value-text');
    expect(selectValue.innerText).toBe('Blue, Pink, White');
  });

  it('should set selected value to fieldValue', async() => {
    await openOverlay();

    const selectOptions = getMatOptionsFromOverlay();
    expect(selectOptions).toBeTruthy();
    selectOptions[1].click();

    await component.whenStable();
    component.detectChanges();

    // Verify
    expect(component.componentInstance.field.getValue()).toBe('blue');
  });

  it('should contain all options in select', async() => {
    await openOverlay();
    const selectOptions = getMatOptionsFromOverlay();

    // Verify
    expect(selectOptions.length).toBe(4);
    expect(selectOptions[0].innerText).toEqual('');
    expect(selectOptions[1].innerText).toContain('Blue');
    expect(selectOptions[2].innerText).toContain('Pink');
    expect(selectOptions[3].innerText).toContain('White');
  });

  async function openOverlay() {
    const selectTrigger = component.debugElement.query(By.css('.mat-select-trigger'));
    selectTrigger.nativeElement.click();

    await component.whenStable();
    component.detectChanges();
  }

  function getMatOptionsFromOverlay(): HTMLElement[] {
    return Array.from(_containerElement.querySelectorAll('mat-option'));
  }

});
