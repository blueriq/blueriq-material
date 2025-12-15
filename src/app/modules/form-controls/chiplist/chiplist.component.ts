import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatOptionSelectionChange } from '@angular/material/core';
import { BlueriqComponent, BlueriqSession, bySelector, OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { DomainValue, Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

interface ChiplistValue {
  value: string;
  displayValue: string;
}

@Component({
  selector: 'bq-chiplist',
  templateUrl: './chiplist.component.html',
})
@BlueriqComponent({
  type: Field,
  selector: bySelector(
    '[multiValued].' + BqPresentationStyles.AUTOCOMPLETE +
    ',[multiValued][hasDomain=false]', { priorityOffset: 100 }),
})
export class ChiplistComponent implements OnInit, OnUpdate {

  separatorKeysCodes = [ENTER, TAB, COMMA];
  values: ChiplistValue[];
  formControl = this.form.control(this.field, { syncOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });
  filteredDomainOptions: DomainValue[] = [];

  @HostBinding('class.fx-flex-row')

  @ViewChild('input', { static: true })
  inputField: ElementRef;

  constructor(public field: Field,
              private readonly session: BlueriqSession,
              private readonly form: BlueriqFormBuilder) {
  }

  ngOnInit() {
    this.syncValues();
  }

  bqOnUpdate() {
    this.syncValues();
  }

  /**
   * Populates the list of values that will be used by the chiplist.
   */
  syncValues(): void {
    this.values = this.field.listValue.map(lv => this.findDomainValueByValue(lv));
  }

  findDomainValueByValue(value: string): { value: string; displayValue: string } {
    const displayValue = this.field.domain.getDisplayValue(value);
    return { value, displayValue: displayValue || value };
  }

  /**
   * The possible domain options will be filtered based on the string value from the input field
   */
  filterDomain(value: string): void {
    if (this.field.hasDomain) {
      this.filteredDomainOptions = this.field.domain.options.filter(
        option => !this.valueExistsInChipList(option.value!.toString())
          && this.normalize(option.displayValue).includes(this.normalize(value)));
    }
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  /**
   * Add items to the values list when no domain is present.
   * Whenever one of the `separatorKeysCodes` was used that piece of text will be added
   */
  addByInput(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    if (!this.field.hasDomain && value !== '' && !this.valueExistsInChipList(value)) {
      this.values.push({ displayValue: value, value: value });
      this.updateFormControlValue();
      input.value = '';
      input.focus();
    }
  }

  /**
   * Add items to the values list when a domain is present.
   * Whenever an item is selected from the 'mat-autocomplete' the selected value will be added.
   */
  addByAutoComplete(e: MatOptionSelectionChange, input: HTMLInputElement): void {
    const { value, displayValue } = e.source.value;
    if (!this.valueExistsInChipList(value)) {
      this.values.push({ displayValue: displayValue, value: value });
      this.updateFormControlValue();
    }

    // Reset the filter after adding a chip
    input.value = '';
    this.filterDomain('');
    this.inputField.nativeElement.focus();
  }

  /**
   * Remove the item from the values list based on value
   * */
  remove(value: ChiplistValue): void {
    const index = this.values.indexOf(value);
    if (index >= 0) {
      this.values.splice(index, 1);
      this.updateFormControlValue();
    }
  }

  /**
   * Checks if the value of the autocomplete input is valid within the fields' domain.
   * If that is not the case, reset the input value
   * @param event the event that is dispatched when the input value is changed (blur)
   */
  addDomainValueOnBlur(event): void {
    if (this.field.hasDomain && event && event.target && event.target.value) {
      const matchingOptions = this.field.domain.options.filter(option =>
        this.normalize(option.value!.toString()) === this.normalize(event.target.value));

      if (matchingOptions.length > 0) {
        const value = matchingOptions[0].value!.toString();
        const displayValue = matchingOptions[0].displayValue;

        if (!this.valueExistsInChipList(value)) {
          this.values.push({
            displayValue: displayValue,
            value: value,
          });
          this.updateFormControlValue();
        }
      }
      event.target.value = '';
    }
  }

  isDisabled(): boolean {
    return this.field.styles.has(BqPresentationStyles.DISABLED);
  }

  private updateFormControlValue(): void {
    this.formControl.setValue(this.values.map(v => v.value));
  }

  private valueExistsInChipList(value: string): boolean {
    return this.values.some(v => this.normalize(v.value) === this.normalize(value));
  }

  private normalize(val): string {
    const dataType = this.field.dataType;

    if (dataType === 'number' || dataType === 'percentage' || dataType === 'currency') {
      return parseFloat(val).toString();
    } else {
      return val.toLowerCase();
    }
  }
}
