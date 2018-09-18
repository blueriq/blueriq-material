import { ENTER } from '@angular/cdk/keycodes';
import { Component, Host, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { BlueriqComponent, BlueriqSession, OnUpdate } from '@blueriq/angular';
import { Field, MultiValuedType, TextType } from '@blueriq/core';

@Component({
  selector: 'bq-chiplist',
  templateUrl: './chiplist.component.html',
  styleUrls: ['./chiplist.component.scss']
})
@BlueriqComponent({
  type: Field,
  selector: '[multiValued][dataType=text]:not([hasDomain])'
})
export class ChiplistComponent implements OnInit, OnUpdate {

  separatorKeysCodes = [ENTER];
  values: string[];

  constructor(@Host() public field: Field<MultiValuedType<TextType>>,
              private session: BlueriqSession) {
  }

  ngOnInit() {
    this.values = this.field.listValue;
  }

  bqOnUpdate() {
    this.values = this.field.listValue;
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    let sanitizedValue = (value || '').trim();

    if (sanitizedValue && !this.values.map(x => x.toLowerCase()).includes(sanitizedValue.toLowerCase())) {
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

}
