import {async, TestBed} from '@angular/core/testing';

import {RadioComponent} from './radio.component';
import {FieldTemplate} from '@blueriq/core/testing';
import {BlueriqComponents} from '@blueriq/angular';
import {BlueriqSessionTemplate, BlueriqTestingModule} from '@blueriq/angular/testing';
import {MaterialModule} from '../../material/material.module';

describe('RadioComponent', () => {
  const field = FieldTemplate.text('muppets').domain({
    'kermit': 'Kermit',
    'miss_piggy': 'Miss Piggy',
    'beaker': 'Beaker'
  });
  let session;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioComponent],
      providers: [BlueriqComponents.register([RadioComponent])],
      imports: [
        MaterialModule,
        BlueriqTestingModule,
      ]
    });
  }));

  beforeEach(() => {
    // reset field to default
    field.styles('radio').readonly(false).value(null);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(RadioComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be checked', () => {
    let inputField = component.nativeElement.querySelector('.mat-radio-checked');
    expect(inputField).toBeFalsy('by default nothing is checked');

    session.update(
      field.value('beaker')
    );
    inputField = component.nativeElement.querySelector('.mat-radio-checked');
    expect(inputField).toBeTruthy();
  });

  it('should be disabled', () => {
    let inputField = component.nativeElement.querySelector('input[type=radio]').hasAttribute('disabled');
    expect(inputField).toBeFalsy('by default nothing is disabled');

    session.update(
      field.styles('radio', 'Disabled')
    );
    inputField = component.nativeElement.querySelector('input[type=radio]').hasAttribute('disabled');
    expect(inputField).toBeTruthy();
  });

  it('should be read only', () => {
    let inputField = component.nativeElement.querySelector('mat-radio-button');
    expect(inputField).toBeTruthy('by default nothing is rendered read only');

    session.update(
      field.readonly(true)
    );
    inputField = component.nativeElement.querySelector('mat-radio-button');
    expect(inputField).toBeFalsy();

  });

  it('style `radio` is required', () => {
    // remove styles
    field.styles();
    session = BlueriqSessionTemplate.create().build(field);
    expect(function () {
      session.get(RadioComponent);
    }).toThrow();
  });

  it('default direction is `vertical`', () => {
    let inputField = component.nativeElement.querySelector('.vertical');
    expect(inputField).toBeTruthy();

    // override default with presentation style
    session.update(
      field.styles('radio', 'horizontal')
    );
    inputField = component.nativeElement.querySelector('.horizontal');
    expect(inputField).toBeTruthy('settings presentation style `horizontal` overrides default behaviour');

  });

  it('default direction is `horizontal` when there are exactly 2 radio buttons', () => {
    const two_options = FieldTemplate.text('two_options').domain({1: 'One', 2: 'Two'}).styles('radio');
    session = BlueriqSessionTemplate.create().build(two_options);
    component = session.get(RadioComponent);
    let inputField = component.nativeElement.querySelector('.horizontal');
    expect(inputField).toBeTruthy();

    // override default with presentation style
    session.update(
      two_options.styles('radio', 'vertical')
    );
    inputField = component.nativeElement.querySelector('.vertical');
    expect(inputField).toBeTruthy('setting presentation style `vertical` overrides default behaviour');
  });

});
