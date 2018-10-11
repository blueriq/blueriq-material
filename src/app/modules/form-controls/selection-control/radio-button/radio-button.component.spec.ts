import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { FormControlModule } from '../../form-control.module';

import { RadioButtonComponent } from './radio-button.component';

describe('RadioButtonComponent', () => {
  let field: FieldTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<RadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.text('muppets').domain({
      'kermit': 'Kermit',
      'miss_piggy': 'Miss Piggy',
      'beaker': 'Beaker'
    });
    // reset field to default
    field.styles(BqPresentationStyles.RADIO).readonly(false).value('');
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(RadioButtonComponent);
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

    field.styles(BqPresentationStyles.RADIO, BqPresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(RadioButtonComponent);

    inputField = component.nativeElement.querySelector('input[type=radio]').hasAttribute('disabled');
    expect(inputField).toBeTruthy();
  });

  it('style `radio` is required', () => {
    // remove styles
    field.styles();
    session = BlueriqSessionTemplate.create().build(field);
    expect(function () {
      session.get(RadioButtonComponent);
    }).toThrow();
  });

  it('default direction is `vertical`', () => {
    let styledDiv = component.nativeElement.querySelector('mat-radio-group').querySelector('div');
    expect(styledDiv.style.flexDirection).toBe('column');
    expect(styledDiv.style.boxSizing).toBe('border-box');
    expect(styledDiv.style.display).toBe('flex');

    // override default with presentation style
    session.update(
      field.styles(BqPresentationStyles.RADIO, BqPresentationStyles.DEPRECATED_HORIZONTAL)
    );
    styledDiv = component.nativeElement.querySelector('mat-radio-group').querySelector('div');
    expect(styledDiv.style.flexFlow).toBe('row wrap');
    expect(styledDiv.style.boxSizing).toBe('border-box');
    expect(styledDiv.style.display).toBe('flex');
  });

  it('default direction is `vertical` with PS RadioHorizontal', () => {
    let styledDiv = component.nativeElement.querySelector('mat-radio-group').querySelector('div');
    expect(styledDiv.style.flexDirection).toBe('column');
    expect(styledDiv.style.boxSizing).toBe('border-box');
    expect(styledDiv.style.display).toBe('flex');

    // override default with presentation style
    session.update(
      field.styles(BqPresentationStyles.HORIZONTAL)
    );
    styledDiv = component.nativeElement.querySelector('mat-radio-group').querySelector('div');
    expect(styledDiv.style.flexFlow).toBe('row wrap');
    expect(styledDiv.style.boxSizing).toBe('border-box');
    expect(styledDiv.style.display).toBe('flex');
  });

  it('default direction is `horizontal` when there are exactly 2 radio buttons', () => {
    session.update(
      field.name('two_options').domain({
        1: 'One',
        2: 'Two'
      }).styles(BqPresentationStyles.RADIO)
    );

    let styledDiv = component.nativeElement.querySelector('mat-radio-group').querySelector('div');
    expect(styledDiv.style.flexFlow).toBe('row wrap');
    expect(styledDiv.style.boxSizing).toBe('border-box');
    expect(styledDiv.style.display).toBe('flex');

    // override default with presentation style
    session.update(
      field.styles(BqPresentationStyles.RADIO, BqPresentationStyles.DEPRECATED_VERTICAL)
    );
    styledDiv = component.nativeElement.querySelector('mat-radio-group').querySelector('div');
    expect(styledDiv.style.flexFlow).toBe('row wrap');
    expect(styledDiv.style.boxSizing).toBe('border-box');
    expect(styledDiv.style.display).toBe('flex');
  });
});
