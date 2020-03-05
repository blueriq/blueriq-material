import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { FormControlModule } from '../form-control.module';

import { ChiplistComponent } from './chiplist.component';

describe('ChiplistComponent', () => {
  let fieldTemplate: FieldTemplate;
  let component: ChiplistComponent;
  let fixture: ComponentFixture<ChiplistComponent>;
  let session: BlueriqTestSession;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormControlModule,
      ],
    });
  });

  describe('without domain', () => {

    beforeEach(() => {
      fieldTemplate = FieldTemplate.text('colour').value(['Red', 'Green', 'Blue']);
      session = BlueriqSessionTemplate.create().build(fieldTemplate);
      fixture = session.get(ChiplistComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component.values.length).toBe(3);
      expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(3);
    });

    it('should add a chip', () => {
      const inputField = fixture.nativeElement.querySelector('.mat-input-element');
      expect(inputField).toBeTruthy();

      inputField.value = 'Yellow';
      inputField.dispatchEvent(new Event('blur'));

      fixture.detectChanges();
      expect(component.values.length).toBe(4);
      expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(4);
      expect(Array.from(fixture.nativeElement.querySelectorAll('mat-chip'))
        .some((chip: any) => chip.childNodes[1].nodeValue.trim() === 'Yellow')).toBeTruthy();
      expect(inputField.value).toBe('');
    });

    it('should add a chip for float value', () => {
      fieldTemplate = FieldTemplate.currency('salary').value(['123.99', '234.50', '456.00']);
      session = BlueriqSessionTemplate.create().build(fieldTemplate);
      fixture = session.get(ChiplistComponent);
      component = fixture.componentInstance;

      const inputField = fixture.nativeElement.querySelector('.mat-input-element');
      expect(inputField).toBeTruthy();

      inputField.value = '678.20';
      inputField.dispatchEvent(new Event('blur'));

      fixture.detectChanges();
      expect(component.values.length).toBe(4);
      expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(4);
      expect(Array.from(fixture.nativeElement.querySelectorAll('mat-chip'))
        .some((chip: any) => chip.childNodes[1].nodeValue.trim() === '678.20')).toBeTruthy();
      expect(inputField.value).toBe('');
    });

    it('should remove a chip', () => {
      const chipRemoveButton = fixture.nativeElement.querySelectorAll('.mat-chip-remove')[0];

      chipRemoveButton.dispatchEvent(new Event('click'));

      fixture.detectChanges();
      expect(component.values.length).toBe(2);
      expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(2);
      expect(Array.from(fixture.nativeElement.querySelectorAll('mat-chip'))
        .some((chip: any) => chip.childNodes[1].nodeValue.trim() === 'Red')).toBeFalsy();
    });

    it('should not add an existing chip case insensitive', () => {
      const inputField = fixture.nativeElement.querySelector('.mat-input-element');
      expect(inputField).toBeTruthy();

      inputField.value = 'red';
      inputField.dispatchEvent(new Event('blur'));

      fixture.detectChanges();
      expect(component.values.length).toBe(3);
      expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(3);
    });

  });

  describe('with domain', () => {

    beforeEach(() => {
      fieldTemplate = FieldTemplate.text('colour')
        .value(['r', 'g'])
        .styles(BqPresentationStyles.AUTOCOMPLETE)
        .domain({
          'r': 'Red',
          'w': 'White',
          'b': 'Blue',
          'o': 'Orange',
          'g': 'Green',
        });
      session = BlueriqSessionTemplate.create().build(fieldTemplate);
      fixture = session.get(ChiplistComponent);
      component = fixture.componentInstance;
    });

    it('should have correctly mapped the values', () => {
      expect(component.values).toEqual([{ value: 'r', displayValue: 'Red' }, { value: 'g', displayValue: 'Green' }]);
    });

    it('should not be editable or chips be deletable when presentation style \'Disabled\' is set', () => {
      session.update(
        fieldTemplate.styles(BqPresentationStyles.DISABLED),
      );
      const chipRemoveButton = fixture.nativeElement.querySelectorAll('.mat-chip-remove');
      expect(chipRemoveButton.length).toBe(0);
    });

    it('should add chip from autocomplete selected value', async() => {
      const autocompleteInput = fixture.debugElement.query(By.css('.mat-input-element'));
      expect(autocompleteInput).toBeTruthy();
      expect(component.field.getValue()).toEqual(['r', 'g']);

      autocompleteInput.nativeElement.focus();
      autocompleteInput.nativeElement.value = 'bl';
      autocompleteInput.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Enter' }));
      autocompleteInput.nativeElement.dispatchEvent(new Event('input'));

      await fixture.whenStable();
      fixture.detectChanges();

      const autocompleteContent = fixture.debugElement.query(By.css('.mat-autocomplete-panel')).nativeElement;
      const autocompleteOptions = autocompleteContent.querySelector('mat-option');
      // Click on the 'Blue' option
      autocompleteOptions.click();

      await fixture.whenStable();
      fixture.detectChanges();

      // Verify
      // The technical value for 'Blue' is 'b'
      expect(component.formControl.value).toEqual(['r', 'g', 'b']);
    });

    it('should synchronize values when the field is updated', () => {
      session.update(fieldTemplate.value(['o']));

      expect(component.values).toEqual([{ value: 'o', displayValue: 'Orange' }]);
    });
  });
});
