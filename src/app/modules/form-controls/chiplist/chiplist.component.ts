import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { Component, Host, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { BlueriqComponent, BlueriqSession, bySelector, OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

@Component({
  selector: 'bq-chiplist',
  templateUrl: './chiplist.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: bySelector('[multiValued=true]:not([hasDomain])', { priorityOffset: 100 })
})
export class ChiplistComponent implements OnInit, OnUpdate {

  separatorKeysCodes = [ENTER, TAB, COMMA];
  values: string[];
  formControl = this.form.control(this.field, { syncOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });

  constructor(@Host() public field: Field,
              private session: BlueriqSession,
              private form: BlueriqFormBuilder) {
  }

  ngOnInit() {
    this.values = this.field.listValue;
  }

  bqOnUpdate() {
    this.values = this.field.listValue;
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    let sanitizedValue = this._sanitizeValue(event.value);

    if (sanitizedValue && !this._valueExists(sanitizedValue)) {
      this.values.push(sanitizedValue);
      this.field.setValue(this.values);
      this.session.changed(this.field);
      sanitizedValue = '';
    }
    if (input) {
      input.value = sanitizedValue;
    }
  }

  remove(value: string) {
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
    if (this.field.dataType === 'text') {
      return this.values.map(x => x.toLowerCase()).includes(value.toLowerCase());
    }
    return this.values.includes(value);
  }

}
