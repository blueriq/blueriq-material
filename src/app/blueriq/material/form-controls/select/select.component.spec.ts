import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../generic/element/element.component';
import { MaterialModule } from '../../material/material.module';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let field: FieldTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<SelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent, ElementComponent],
      providers: [BlueriqComponents.register([SelectComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule
      ]
    });
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be disabled', () => {
    let selectDisabled = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectDisabled).toBeFalsy();

    field.styles(PresentationStyles.DISABLED);
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

  it('should have more values selected', () => {
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
    });
  });

  it('should set selected value to fieldValue', () => {
    const selectTrigger = component.debugElement.query(By.css('.mat-select-trigger'));
    expect(selectTrigger).toBeTruthy();

    selectTrigger.nativeElement.click();
    component.whenStable()
      .then(() => {
        component.detectChanges();
        const selectContent = component.debugElement.query(By.css('.mat-select-content')).nativeElement;
        const selectOptions = selectContent.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
        expect(selectOptions).toBeTruthy();
        selectOptions[1].click();
      });

    component.whenStable()
      .then(() => {
        component.detectChanges();
        // Verify
        expect(component.componentInstance.field.getValue()).toBe('blue');
      });
  });

  it('should contain all options in select', () => {
    const selectTrigger = component.debugElement.query(By.css('.mat-select-trigger'));
    expect(selectTrigger).toBeTruthy();

    selectTrigger.nativeElement.click();
    component.whenStable()
      .then(() => {
        component.detectChanges();

        const selectContent = component.debugElement.query(By.css('.mat-select-content')).nativeElement;
        const selectOptions = selectContent.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;

        // Verify
        expect(selectOptions.length).toBe(4);
        expect(selectOptions[0].getAttribute('ng-reflect-value')).toBe(null);
        expect(selectOptions[1].getAttribute('ng-reflect-value')).toBe('blue');
        expect(selectOptions[2].getAttribute('ng-reflect-value')).toBe('pink');
        expect(selectOptions[3].getAttribute('ng-reflect-value')).toBe('white');
      });
  });

  it('should contain explain and message support', () => {
    const appElement = component.nativeElement.querySelector('app-element');
    expect(appElement).toBeTruthy();
  });
});


