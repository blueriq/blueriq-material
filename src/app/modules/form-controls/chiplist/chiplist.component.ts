import { ENTER } from '@angular/cdk/keycodes';
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

  separatorKeysCodes = [ENTER];
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

    if (sanitizedValue && this._shouldAddOption(sanitizedValue)) {
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

  private _sanitizeValue(value: string): string {
    const sanitizedValue = (value || '').trim();
    if (this.field.dataType === 'boolean') {
      if (value.toLowerCase() === 'true' || value === '1') {
        return 'true';
      } else if (value.toLowerCase() === 'false' || value === '0') {
        return 'false';
      }
    }
    return sanitizedValue;
  }

  private _shouldAddOption(value: string): boolean {
    if (this._valueExists(value)) {
      return false;
    }
    if (this.field.dataType === 'boolean') {
      if (value !== 'true' && value !== 'false') {
        return false;
      }
    }
    return true;
  }

  private _valueExists(value: string): boolean {
    if (this.field.dataType === 'text') {
      return this.values.map(x => x.toLowerCase()).includes(value.toLowerCase());
    } else if (this.field.dataType === 'boolean') {
      value = value.toLowerCase() === 'true' ? 'true' : 'false';
      if (this.values.includes(value)) {
        return true;
      } else {
        return false;
      }
    }
    return this.values.includes(value);
  }

}
