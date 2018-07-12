import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../generic/element/element.component';
import { MaterialModule } from '../../material.module';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';

import { RadioButtonComponent } from './radio-button.component';

describe('RadioButtonComponent', () => {
  let field: FieldTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<RadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioButtonComponent, ElementComponent],
      providers: [BlueriqComponents.register([RadioButtonComponent])],
      imports: [
        MaterialModule,
        FlexLayoutModule,
        BlueriqTestingModule
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
    field.styles(PresentationStyles.RADIO).readonly(false).value('');
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(RadioButtonComponent);
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

    field.styles(PresentationStyles.RADIO, PresentationStyles.DISABLED);
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
    let inputField = component.nativeElement.querySelector('.vertical');
    expect(inputField).toBeTruthy();

    // override default with presentation style
    session.update(
      field.styles(PresentationStyles.RADIO, PresentationStyles.HORIZONTAL)
    );
    inputField = component.nativeElement.querySelector('.horizontal');
    expect(inputField).toBeTruthy('settings presentation style `horizontal` overrides default behaviour');

  });

  it('default direction is `horizontal` when there are exactly 2 radio buttons', () => {
    session.update(
      field.name('two_options').domain({
        1: 'One',
        2: 'Two'
      }).styles(PresentationStyles.RADIO)
    );

    let inputField = component.nativeElement.querySelector('.horizontal');
    expect(inputField).toBeTruthy();

    // override default with presentation style
    session.update(
      field.styles(PresentationStyles.RADIO, PresentationStyles.VERTICAL)
    );
    inputField = component.nativeElement.querySelector('.vertical');
    expect(inputField).toBeTruthy('setting presentation style `vertical` overrides default behaviour');
  });

});
