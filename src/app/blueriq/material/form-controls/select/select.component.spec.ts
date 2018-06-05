import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../generic/element/element.component';
import { MaterialModule } from '../../material/material.module';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  const field = FieldTemplate.text('colour').domain({
    'blue': 'Blue',
    'pink': 'Pink',
    'white': 'White'
  });
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
    field.value('').readonly(false).styles('');
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);
  });

  it ('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should be disabled', () => {
    let inputField = component.nativeElement.querySelector('.mat-select-disabled');
    expect(inputField).toBeFalsy();

    session.update(
      field.styles('Disabled')
    );
      inputField = component.nativeElement.querySelector('.mat-select-disabled');
      expect(inputField).toBeTruthy();
  });

  it ('should be read only', () => {
    let inputField = component.nativeElement.querySelector('.mat-select-value');
    expect(inputField).toBeTruthy();

    session.update(
      field.readonly(true)
    );
    inputField = component.nativeElement.querySelector('.mat-select-value').getAttribute('aria-label');
    expect(inputField).toBeFalsy();
  });

  it ('should selected one value', () => {
    let inputField = component.nativeElement.querySelector('.mat-select').getAttribute('ng-reflect-value');
    expect(inputField).toBe('');


    field.value(['blue']);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);

    inputField = component.nativeElement.querySelector('.mat-select').getAttribute('ng-reflect-value');
    console.log(inputField);
    expect(inputField).toBe('blue');
  });

  it ('should selected more values', () => {
    let inputField = component.nativeElement.querySelector('.mat-select').getAttribute('ng-reflect-value');
    expect(inputField).toBe('');

    field.value(['blue, pink, white']);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SelectComponent);

    inputField = component.nativeElement.querySelector('.mat-select').getAttribute('ng-reflect-value');
    console.log(inputField);
    expect(inputField).toBe('blue, pink, white');
  });

});


