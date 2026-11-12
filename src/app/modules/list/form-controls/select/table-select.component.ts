import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueriqComponent, BlueriqCommonModule } from '@blueriq/angular';
import { getFieldMessages } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { SelectComponent } from '../../../form-controls/select/select.component';
import { MatFormField } from '@angular/material/form-field';
import { BqKeyDirective } from '../../../../shared/directive/bq-key/bq-key.directive';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSelect } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';

@Component({
    selector: 'bq-table-select',
    templateUrl: './table-select.component.html',
    styleUrls: ['../table-form-control.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatFormField, BqKeyDirective, BlueriqCommonModule, MatTooltip, MatSelect, FormsModule, ReactiveFormsModule, MatOption]
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

