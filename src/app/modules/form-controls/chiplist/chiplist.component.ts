import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { Component, Host, OnInit } from '@angular/core';
import { MatChipInputEvent, MatOptionSelectionChange } from '@angular/material';
import { BlueriqComponent, BlueriqSession, bySelector, OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { DomainValue, Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

@Component({
  selector: 'bq-chiplist',
  templateUrl: './chiplist.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: bySelector(
    '[multiValued].' + BqPresentationStyles.AUTOCOMPLETE +
    ',[multiValued][hasDomain=false]', { priorityOffset: 100 })
})
export class ChiplistComponent implements OnInit, OnUpdate {

  separatorKeysCodes = [ENTER, TAB, COMMA];
  values: { displayValue: string, value: string }[];
  formControl = this.form.control(this.field, { syncOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });
  filteredDomainOptions: DomainValue[];

  constructor(@Host() public field: Field,
              private session: BlueriqSession,
              private form: BlueriqFormBuilder) {
  }

  ngOnInit() {
    this.fillValues();
  }

  bqOnUpdate() {
    this.fillValues();
  }

  /**
   * Fill the values list that will be used by the chiplist.
   * These values are based on what was already on the `field`'s listValue
   */
  fillValues() {
    if (this.field.hasDomain) {
      this.values = this.field.listValue.map(lv => this.findDomainValueByValue(lv));
    } else {
      this.values = this.field.listValue.map(lv => {
        return { displayValue: lv, value: lv };
      });
    }
  }

  findDomainValueByValue(value): { displayValue: string, value: string } {
    const val = this.field.domain.options.find(d => d.value === value);
    return val ? val : { displayValue: value, value: value };
  }

  /**
   * The possible domain options will be filtered based on the string value from the input field
   */
  filterDomain(value) {
    if (this.field.hasDomain) {
      this.filteredDomainOptions = this.field.domain.options.filter(option => option.displayValue.toLowerCase().includes(value.toLowerCase()));
    }
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  /**
   * Add items to the values list. (without a domain)
   * Whenever one of the `separatorKeysCodes` was used that piece of text will be added
   */
  addByInput(event: MatChipInputEvent) {
    const input = event.input;
    if (this.field.hasDomain) {
      input.value = '';
      this.sessionChanged();
      return;
    }

    let sanitizedValue = this._sanitizeValue(event.value);
    if (sanitizedValue && !this._valueExists(sanitizedValue)) {
      this.values.push({ displayValue: sanitizedValue, value: sanitizedValue });
      this.sessionChanged();
      sanitizedValue = '';
    }
    if (input) {
      input.value = sanitizedValue;
    }
  }

  /**
   * Add items to the values list (With a domain)
   * Whenever a item is selected from the 'mat-autocomplete' the selected value will be added
   */
  addByAutoComplete(e: MatOptionSelectionChange) {
    const selectedValue = e.source.value;
    this.values.push({ displayValue: selectedValue.displayValue, value: selectedValue.value });
    this.sessionChanged();
  }

  /**
   * Remove the item vrom the values list based on value
   * */
  remove(value: any) {
    const index = this.values.indexOf(value);
    if (index >= 0) {
      this.values.splice(index, 1);
      this.sessionChanged();
    }
  }

  /**
   * Checks if the value of the autocomplete input is valid within the fields' domain.
   * If that is not the case, reset the input value
   * @param event the event that is dispatched when the input value is changed (blur)
   */
  checkValidOption(event): void {
    if (event && event.target && event.target.value) {
      if (this.field.domain.getValue(event.target.value) === undefined) {
        event.target.value = null;
        this.sessionChanged();
      }
    }
  }

  sessionChanged() {
    this.field.setValue(this.values.map(v => v.value));
    this.session.changed(this.field);
  }

  isDisabled(): boolean {
    return this.field.styles.has(BqPresentationStyles.DISABLED);
  }

  private _sanitizeValue(value: string): string {
    return (value || '').trim();
  }

  private _valueExists(value: string): boolean {
    return this.values.map(x => x.value.toLowerCase()).includes(value.toLowerCase());
  }

}
