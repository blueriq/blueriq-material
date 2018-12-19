import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSession } from '@blueriq/angular';
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
      spyOn(BlueriqSession.prototype, 'changed');
    });

    it('should create', () => {
      expect(component.values.length).toBe(3);
      expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(3);
    });

    it('should add a chip', () => {
      const inputField = fixture.nativeElement.querySelector('.mat-input-element');
      expect(inputField).toBeTruthy();

      if (inputField) {
        inputField.value = 'Yellow';
        inputField.dispatchEvent(new Event('blur'));

        fixture.detectChanges();
        expect(component.values.length).toBe(4);
        expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(4);
        expect(inputField.value).toBe('');
        expect(BlueriqSession.prototype.changed).toHaveBeenCalledWith(component.field);
      }
    });

    it('should add a chip for float value', () => {
      fieldTemplate = FieldTemplate.currency('salary').value(['123.99', '234.50', '456.00']);
      session = BlueriqSessionTemplate.create().build(fieldTemplate);
      fixture = session.get(ChiplistComponent);
      component = fixture.componentInstance;

      const inputField = fixture.nativeElement.querySelector('.mat-input-element');
      expect(inputField).toBeTruthy();

      if (inputField) {
        inputField.value = '678.20';
        inputField.dispatchEvent(new Event('blur'));

        fixture.detectChanges();
        expect(component.values.length).toBe(4);
        expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(4);
        expect(inputField.value).toBe('');
        expect(BlueriqSession.prototype.changed).toHaveBeenCalledWith(component.field);
      }
    });

    it('should remove a chip', () => {
      const chipRemoveButton = fixture.nativeElement.querySelectorAll('.mat-chip-remove')[0];
      if (chipRemoveButton) {
        chipRemoveButton.dispatchEvent(new Event('click'));

        fixture.detectChanges();
        expect(component.values.length).toBe(2);
        expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(2);
        expect(BlueriqSession.prototype.changed).toHaveBeenCalledWith(component.field);
      }
    });

    it('should not add an existing chip case insensitive', () => {
      const inputField = fixture.nativeElement.querySelector('.mat-input-element');
      expect(inputField).toBeTruthy();

      if (inputField) {
        inputField.value = 'red';
        inputField.dispatchEvent(new Event('blur'));

        fixture.detectChanges();
        expect(component.values.length).toBe(3);
        expect(fixture.nativeElement.querySelectorAll('mat-chip').length).toBe(3);
      }
    });

  });

  describe('with domain', () => {

    beforeEach(() => {
      spyOn(ChiplistComponent.prototype, 'fillValues').and.callThrough();
      spyOn(BlueriqSession.prototype, 'changed');
      fieldTemplate = FieldTemplate
      .text('colour')
      .value(['a', 'e'])
      .styles(BqPresentationStyles.AUTOCOMPLETE)
      .domain({
        'a': 'Red',
        'b': 'White',
        'c': 'Blue',
        'd': 'Orange',
        'e': 'Green',
      });
      session = BlueriqSessionTemplate.create().build(fieldTemplate);
      fixture = session.get(ChiplistComponent);
      component = fixture.componentInstance;
    });

    it('should have correctly have mapped the values', () => {
      expect(component.values.length).toBe(2);
      expect(component.values).toEqual([{ value: 'a', displayValue: 'Red' }, { value: 'e', displayValue: 'Green' }]);
    });

    it('should not be editable or chips be deletable when presentation style \'Disabled\' is set', () => {
      session.update(
        fieldTemplate.styles(BqPresentationStyles.DISABLED),
      );
      const chipRemoveButton = fixture.nativeElement.querySelectorAll('.mat-chip-remove');
      expect(chipRemoveButton.length).toBe(0);
    });

    it('should add chip from autocomplete selected value', () => {
      const autocompleteInput = fixture.debugElement.query(By.css('.mat-input-element'));
      expect(autocompleteInput).toBeTruthy();
      expect(component.field.getValue()).toEqual(['a', 'e']);

      autocompleteInput.nativeElement.focus();
      autocompleteInput.nativeElement.value = 'bl';
      autocompleteInput.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Enter' }));
      autocompleteInput.nativeElement.dispatchEvent(new Event('input'));

      fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        const autocompleteContent = fixture.debugElement.query(By.css('.mat-autocomplete-panel')).nativeElement;
        const autocompleteOptions = autocompleteContent.querySelector('mat-option');
        // Click on the 'Blue' option
        autocompleteOptions.click();
      });

      fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        // Verify
        // The technical value for 'Blue' is 'c'
        expect(component.field.getValue()).toEqual(['a', 'e', 'c']);
      });
    });

    it('should call fillValues onInit and onUpdate', () => {
      expect(ChiplistComponent.prototype.fillValues).toHaveBeenCalledTimes(1);
      session.update(fieldTemplate.domain({}));
      expect(ChiplistComponent.prototype.fillValues).toHaveBeenCalledTimes(2);
    });

  });

})
;
