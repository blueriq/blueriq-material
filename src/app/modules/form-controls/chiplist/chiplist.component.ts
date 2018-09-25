import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { Component, Host, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { BlueriqComponent, BlueriqSession, bySelector, OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { DomainValue, Field, FieldMessages } from '@blueriq/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BqPresentationStyles } from '../../BqPresentationStyles';

@Component({
  selector: 'bq-chiplist',
  templateUrl: './chiplist.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: bySelector('[multiValued].'+ BqPresentationStyles.AUTOCOMPLETE + ',[multiValued][hasDomain=false]', { priorityOffset: 100 })
})
export class ChiplistComponent implements OnInit, OnUpdate {

  separatorKeysCodes = [ENTER, TAB, COMMA];
  values: {displayValue: string,value: string}[];
  formControl = this.form.control(this.field, { syncOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });
  filteredDomainOptions$: Observable<DomainValue[]>;

  constructor(@Host() public field: Field,
              private session: BlueriqSession,
              private form: BlueriqFormBuilder) {
  }

  ngOnInit() {
    this.fill();
    this.filteredDomainOptions$ = this.formControl.valueChanges
        .pipe(
          startWith<DomainValue | string>(''),
          map(value => !value ? value : typeof value === 'string' ? value : value.displayValue),
          map(displayValue => displayValue ?
            this.field.domain.options.filter(option => option.displayValue.toLowerCase().includes(displayValue.toLowerCase())) :
            this.field.domain.options.slice())
        );
  }

  bqOnUpdate() {
    this.fill();
  }

  fill() {
    if(this.field.hasDomain) {
      this.values = this.field.listValue.map(lv => this.findDomainValueByValue(lv));
    } else {
      this.values = this.field.listValue.map(lv => { return {displayValue: lv, value: lv}});
    }
  }

  findDomainValueByValue(value): {displayValue: string,value: string}{
    const val = this.field.domain.options.find(d => d.value === value);
    return val ? val : { displayValue: value,value: value};
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  addByInput(event: MatChipInputEvent) {
    const input = event.input;
    let sanitizedValue = this._sanitizeValue(event.value);

    if (sanitizedValue && !this._valueExists(sanitizedValue)) {
      this.values.push({displayValue: sanitizedValue, value: sanitizedValue});
      this.field.setValue(this.values.map(v => v.value));
      this.session.changed(this.field);
      sanitizedValue = '';
    }
    if (input) {
      input.value = sanitizedValue;
    }
  }

  addByAutoComplete(e: MatAutocompleteSelectedEvent) {
    const selectedValue = e.option.value;
    this.values.push({displayValue: selectedValue.displayValue, value: selectedValue.value});
    this.field.setValue(this.values.map(v => v.value));
    this.session.changed(this.field);
  }

  remove(value: any) {
    const index = this.values.indexOf(value);

    if (index >= 0) {
      this.values.splice(index, 1);
      this.field.setValue(this.values);
      this.session.changed(this.field);
    }
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
