import { detectChanges } from '@angular/core/src/render3';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../generic/element/element.component';
import { MaterialModule } from '../../material/material.module';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let field;
  let session;
  let component;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent, ElementComponent],
      providers: [BlueriqComponents.register([SelectComponent])],
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
    field = FieldTemplate.text('colour').domain({
      'blue': 'Blue',
      'pink': 'Pink',
      'white': 'White'
    });
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);
  });

  it ('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should be disabled', () => {
    let selectDisabled = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectDisabled).toBeFalsy();

    session.update(
      field.styles('Disabled')
    );
      selectDisabled = component.nativeElement.querySelector('.mat-select-disabled');
      expect(selectDisabled).toBeTruthy();
  });

  it ('should be read only', () => {
    let selectReadonly = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectReadonly).toBeFalsy();

    session.update(
      field.readonly(true)
    );
    selectReadonly = component.nativeElement.querySelector('.mat-select-disabled');
    expect(selectReadonly).toBeTruthy();
  });

  it ('should selected one value', () => {
    let selectedOneValue = component.nativeElement.querySelector('.mat-select').getAttribute('ng-reflect-value');
    expect(selectedOneValue).toBe('');


    field.value(['blue']);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);

    selectedOneValue = component.nativeElement.querySelector('.mat-select').getAttribute('ng-reflect-value');
    expect(selectedOneValue).toBe('blue');
  });

  it ('should selected more values', () => {
    let selectedMoreValues = component.nativeElement.querySelector('.mat-select').getAttribute('ng-reflect-value');
    expect(selectedMoreValues).toBe('');

    field.value(['blue, pink, white']);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);

    selectedMoreValues = component.nativeElement.querySelector('.mat-select').getAttribute('ng-reflect-value');
    expect(selectedMoreValues).toBe('blue, pink, white');
  });

  fit ('check all domain values', () => {
    let trigger = component.debugElement.query(By.css('.mat-select-trigger')).nativeElement;;
    trigger.click();
    component.detectChanges();

    console.log(component.debugElement.query('mat-option'));
    let domainValues = component.debugElement.querySelector(By.css('.mat-option'));
      //console.log(domainValues);
    expect(domainValues).toBe('');

    session.update(field.value(['blue, pink, white']));
    // session = BlueriqSessionTemplate.create().build(field);
    // component = session.get(SelectComponent);

    domainValues = component.nativeElement.querySelector('.mat-select').getAttribute('ng-reflect-value');
    expect(domainValues).toBe('blue, pink, white');
    });

});


