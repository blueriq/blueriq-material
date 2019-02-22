import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { Component, ElementRef, Host, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent, MatOptionSelectionChange } from '@angular/material';
import { BlueriqComponent, BlueriqSession, bySelector, OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { DomainValue, Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

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
  values: { value: string, displayValue: string }[];
  formControl = this.form.control(this.field, { syncOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });
  filteredDomainOptions: DomainValue[] = [];

  @ViewChild('input')
  inputField: ElementRef;

  constructor(@Host() public field: Field,
              private session: BlueriqSession,
              private form: BlueriqFormBuilder) {
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
  syncValues() {
    this.values = this.field.listValue.map(lv => this.findDomainValueByValue(lv));
  }

  findDomainValueByValue(value: string): { value: string, displayValue: string } {
    const displayValue = this.field.domain.getDisplayValue(value);
    return { value, displayValue: displayValue || value };
  }

  /**
   * The possible domain options will be filtered based on the string value from the input field
   */
  filterDomain(value: string) {
    if (this.field.hasDomain) {
      this.filteredDomainOptions = this.field.domain.options.filter(option => option.displayValue.toLowerCase().includes(value.toLowerCase()));
    }
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  /**
   * Add items to the values list when no domain is present.
   * Whenever one of the `separatorKeysCodes` was used that piece of text will be added
   */
  addByInput(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value.trim();

    if (!this.field.hasDomain && value !== '' && !this._valueExists(value)) {
      this.values.push({ displayValue: value, value: value });
      this.notifyChange();
      input.value = '';
      input.focus();
    }
  }

  /**
   * Add items to the values list when a domain is present.
   * Whenever an item is selected from the 'mat-autocomplete' the selected value will be added.
   */
  addByAutoComplete(e: MatOptionSelectionChange) {
    const { value, displayValue } = e.source.value;
    if (!this._valueExists(value)) {
      this.values.push({ displayValue, value });
      this.notifyChange();
    }

    // Reset the filter after adding a chip
    this.filterDomain('');
    this.inputField.nativeElement.focus();
  }

  /**
   * Remove the item from the values list based on value
   * */
  remove(value: any) {
    const index = this.values.indexOf(value);
    if (index >= 0) {
      this.values.splice(index, 1);
      this.notifyChange();
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
        this.notifyChange();
      }
    }
  }

  notifyChange() {
    this.field.setValue(this.values.map(v => v.value));
    this.session.changed(this.field);
  }

  isDisabled(): boolean {
    return this.field.styles.has(BqPresentationStyles.DISABLED);
  }

  private _valueExists(value: string): boolean {
    const dataType = this.field.dataType;
    const isDecimal = dataType === 'number' || dataType === 'percentage' || dataType === 'currency';
    const normalize = isDecimal ? parseFloat : (val: string) => val.toLowerCase();

    return this.values.some(v => normalize(v.value) === normalize(value));
  }

}
