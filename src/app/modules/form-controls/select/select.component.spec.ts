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
        FormControlModule
      ]
    });
    inject([OverlayContainer], (oc: OverlayContainer) => {
      _containerElement = oc.getContainerElement();
    })();
  });

  beforeEach(() => {
    field = FieldTemplate.text('colour').domain({
      'blue': 'Blue',
      'pink': 'Pink',
      'white': 'White'
    });
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);
  });

  it('should be disabled', () => {
    let selectDisabled = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectDisabled).toBeFalsy();

    field.styles(BqPresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);

    selectDisabled = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectDisabled).toBeTruthy();
  });

  it('should be read only', () => {
    let selectReadonly = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectReadonly).toBeFalsy();

    field.readonly(true);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);

    selectReadonly = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectReadonly).toBeTruthy();
  });

  it('should have a hint', () => {
    session.update(
      field.explainText('explaining it')
    );
    expect(component.nativeElement.querySelector('mat-hint')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-hint').innerHTML).toContain('explaining it');
  });

  it('should have a placeholder', () => {
    session.update(
      field.placeholder('myPlaceholder')
    );
    expect(component.nativeElement.querySelector('.mat-select-placeholder')).toBeTruthy();
    expect(component.nativeElement.querySelector('.mat-select-placeholder').innerText).toBe('myPlaceholder');
  });

  it('should have a error', () => {
    expect(component.nativeElement.querySelector('mat-error')).toBeFalsy();
    component.componentInstance.formControl.markAsTouched();
    component.detectChanges();
    session.update(
      field.required(true),
      field.error('wrong IBAN')
    );
    expect(component.nativeElement.querySelector('mat-error')).toBeTruthy();
  });

  it('should select one value', () => {
    let selectedOneValue = component.nativeElement.querySelector('.mat-select-value-text');
    expect(selectedOneValue).toBeNull();

    session.update(
      field.value('blue')
    );

    selectedOneValue = component.nativeElement.querySelector('.mat-select-value-text').innerText;
    expect(selectedOneValue).toBe('Blue');
  });

  it('should only have one mat-select', () => {
    const selectList = component.nativeElement.querySelectorAll('mat-select') as NodeListOf<HTMLElement>;
    expect(selectList.length).toBe(1);
  });

  it('should have more values selected', (done) => {
    let selectedMoreValues = component.nativeElement.querySelector('.mat-select').getAttribute('ng-reflect-value');
    expect(selectedMoreValues).toBeNull();

    field.value(['blue', 'pink', 'white']);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);

    component.whenStable()
    .then(() => {
      component.detectChanges();
      selectedMoreValues = component.nativeElement.querySelector('.mat-select-value-text').innerText;
      expect(selectedMoreValues).toBe('Blue, Pink, White');
      done();
    });
  });

  it('should set selected value to fieldValue', (done) => {
    component.detectChanges();
    const trigger = component.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    component.detectChanges();

    component.whenStable()
    .then(() => {
      component.detectChanges();
      const selectOptions = getMatOptionsFromOverlay();
      expect(selectOptions).toBeTruthy();
      selectOptions[1].click();
    });

    component.whenStable()
    .then(() => {
      component.detectChanges();
      // Verify
      expect(component.componentInstance.field.getValue()).toBe('blue');
      done();
    });
  });

  it('should contain all options in select', (done) => {
    const selectTrigger = component.debugElement.query(By.css('.mat-select-trigger'));
    expect(selectTrigger).toBeTruthy();

    selectTrigger.nativeElement.click();
    component.whenStable()
    .then(() => {
      component.detectChanges();
      const trigger = component.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      trigger.click();
      component.detectChanges();

      const selectOptions = getMatOptionsFromOverlay();

      // Verify
      expect(selectOptions.length).toBe(4);
      expect(selectOptions[0].getAttribute('ng-reflect-value')).toBe(null);
      expect(selectOptions[1].getAttribute('ng-reflect-value')).toBe('blue');
      expect(selectOptions[2].getAttribute('ng-reflect-value')).toBe('pink');
      expect(selectOptions[3].getAttribute('ng-reflect-value')).toBe('white');
      done();
    });
  });

  function getMatOptionsFromOverlay(): HTMLElement[] {
    return Array.from(_containerElement.querySelectorAll('mat-option'));
  }

});


