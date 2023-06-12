import { Component, OnInit, Optional } from '@angular/core';
import { MatLegacyCheckboxChange as MatCheckboxChange } from '@angular/material/legacy-checkbox';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { List } from '@blueriq/angular/lists';
import { Field, FieldMessages, FieldOption, SingleValuedType } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';

@Component({
  selector: 'bq-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss', '../selection-control.component.scss'],
})
@BlueriqComponent({
  type: Field,
  selector: `.${ BqPresentationStyles.ALLOPTIONSVISIBLE }[multiValued][hasDomain]`,
})
export class CheckboxListComponent implements OnInit, OnUpdate {

  direction: 'vertical' | 'horizontal';

  formControl = this.form.control(this.field, {
    syncOn: 'update',
    disableWhen: BqPresentationStyles.DISABLED,
  });

  constructor(public field: Field,
              private readonly form: BlueriqFormBuilder,
              @Optional() public readonly list: List) {
  }

  ngOnInit() {
    this.updateDirection();
  }

  bqOnUpdate() {
    this.updateDirection();
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  /**
   * Sets the direction in which the checkboxes are presented.
   * By default, the list of checkboxes will be rendered vertically,
   * {@link BqPresentationStyles.HORIZONTAL} will render a horizontal list
   */
  protected updateDirection() {
    if (this.field.styles.hasAny(BqPresentationStyles.HORIZONTAL, BqPresentationStyles.DEPRECATED_HORIZONTAL)) {
      this.direction = 'horizontal';
    } else {
      this.direction = 'vertical';
    }
  }

  isChecked(option: FieldOption): boolean {
    const values = this.field.getValue() as SingleValuedType[];
    return values.includes(option.value);
  }

  onChange(option: FieldOption, event: MatCheckboxChange): void {
    const values = this.field.getValue() as SingleValuedType[];
    const isIncluded = values.includes(option.value);

    if (event.checked) {
      this.formControl.setValue(isIncluded ? values : [...values, option.value]);
    } else {
      this.formControl.setValue(isIncluded ? values.filter(v => v !== option.value) : values);
    }
  }
}
