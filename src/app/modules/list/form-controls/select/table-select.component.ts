import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { getFieldMessages } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { SelectComponent } from '../../../form-controls/select/select.component';

@Component({
  selector: 'bq-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['../table-form-control.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@BlueriqComponent({
  type: Field,
  selector: '[hasDomain]',
})
export class TableSelectComponent extends SelectComponent {

  getErrors(): string {
    return getFieldMessages(this.formControl).all.map(error => error.text).join('\n');
  }

}

