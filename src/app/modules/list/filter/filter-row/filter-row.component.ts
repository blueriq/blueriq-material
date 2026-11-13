import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnFilter } from '@blueriq/angular/lists';
import { FilterCandidate } from '../types';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { DomainFilterComponent } from '../domain-filter/domain-filter.component';
import { BooleanFilterComponent } from '../boolean-filter/boolean-filter.component';
import { NumericFilterComponent } from '../numeric-filter/numeric-filter.component';
import { DateFilterComponent } from '../date-filter/date-filter.component';
import { TextFilterComponent } from '../text-filter/text-filter.component';
import { EmptyFilterComponent } from '../empty-filter/empty-filter.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'bq-filter-row',
    templateUrl: './filter-row.component.html',
    styleUrls: ['./filter-row.component.scss'],
    imports: [
      MatFormField,
      MatSelect,
      MatOption,
      DomainFilterComponent,
      BooleanFilterComponent,
      NumericFilterComponent,
      DateFilterComponent,
      TextFilterComponent,
      EmptyFilterComponent,
      MatIconButton,
      MatIcon,
    ]
})
export class FilterRowComponent {

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  currentColumns: ColumnFilter[];

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  candidate: FilterCandidate;

  @Output()
  removed = new EventEmitter<void>();

  getType(): 'empty' | 'domain' | 'boolean' | 'numeric' | 'date' | 'datetime' | 'text' {
    if (!this.candidate.selectedColumn) {
      return 'empty';
    }

    const type = this.candidate.selectedColumn.type;
    switch (type) {
      case 'domain':
      case 'boolean':
      case 'date':
      case 'datetime':
        return type;
      case 'currency':
      case 'percentage':
      case 'number':
      case 'integer':
        return 'numeric';
      default:
        return 'text';
    }
  }

  onColumnChanged(column: ColumnFilter): void {
    this.candidate.selectedColumn = column;
    this.candidate.predicate = undefined;
  }
}
