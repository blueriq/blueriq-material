import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyRadioGroupHarness as MatRadioGroupHarness } from '@angular/material/legacy-radio/testing';
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
  let loader: HarnessLoader;

  beforeEach(async () => {
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
      .domain({
        'kermit': 'Kermit',
        'miss_piggy': 'Miss Piggy',
        'beaker': 'Beaker',
      })
      .styles(BqPresentationStyles.ALLOPTIONSVISIBLE)
      .readonly(false)
      .value('');
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(RadioButtonComponent);
    component.autoDetectChanges();

    loader = TestbedHarnessEnvironment.loader(component);
  });

  it('should be checked', () => {
    let inputField = component.nativeElement.querySelector('.mat-radio-checked');
    expect(inputField).withContext('by default nothing is checked').toBeFalsy();

    session.update(
      field.value('beaker'),
    );
    inputField = component.nativeElement.querySelector('.mat-radio-checked');
    expect(inputField).toBeTruthy();
  });

  it('should update immediately when checked, without needing to get out of focus', async () => {
    const radioGroup = await loader.getHarness(MatRadioGroupHarness);

    let event = false;
    component.componentInstance.field.onUpdate(() => event = true);

    await radioGroup.checkRadioButton({ label: 'Beaker' });

    expect(event).toBe(true);
  });

  it('should show a disabled option if the current value is not within the domain', () => {
    session.update(
      field.value('unavailable'),
    );
    const inputField = component.nativeElement.querySelector('.mat-radio-checked');
    expect(inputField).toBeTruthy();
    expect(inputField.innerText).toContain('unavailable');
    expect(inputField.classList.contains('mat-radio-disabled')).toBe(true);
  });

  it('should be disabled', () => {
    let isDisabled = component.nativeElement.querySelector('input[type=radio]').hasAttribute('disabled');
    expect(isDisabled).withContext('by default nothing is disabled').toBeFalsy();

    field.styles(BqPresentationStyles.DEPRECATED_RADIO, BqPresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(RadioButtonComponent);

    isDisabled = component.nativeElement.querySelector('input[type=radio]').hasAttribute('disabled');
    expect(isDisabled).toBeTruthy();
  });

  it('style `AllOptionsVisible` is required', () => {
    // remove styles
    field.styles();
    session = BlueriqSessionTemplate.create().build(field);
    expect(() => session.get(RadioButtonComponent)).toThrow();
  });

  it('deprecated style `radio` should also render component', () => {
    // update styles
    field.styles(BqPresentationStyles.DEPRECATED_RADIO);
    session = BlueriqSessionTemplate.create().build(field);
    expect(session.get(RadioButtonComponent)).toBeTruthy();
  });

  it('default direction is `vertical`', () => {
    let styledDiv = component.nativeElement.querySelector('mat-radio-group').querySelector('div');
    expect(styledDiv.style.flexDirection).toBe('column');
    expect(styledDiv.style.boxSizing).toBe('border-box');
    expect(styledDiv.style.display).toBe('flex');

    // override default with presentation style
    session.update(
      field.styles(BqPresentationStyles.DEPRECATED_RADIO, BqPresentationStyles.DEPRECATED_HORIZONTAL),
    );
    styledDiv = component.nativeElement.querySelector('mat-radio-group').querySelector('div');
    expect(styledDiv.style.flexFlow).toBe('wrap');
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
      field.styles(BqPresentationStyles.HORIZONTAL),
    );
    styledDiv = component.nativeElement.querySelector('mat-radio-group').querySelector('div');
    expect(styledDiv.style.flexFlow).toBe('wrap');
    expect(styledDiv.style.boxSizing).toBe('border-box');
    expect(styledDiv.style.display).toBe('flex');
  });

});
