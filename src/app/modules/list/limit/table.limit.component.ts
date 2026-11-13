import { Component, input } from '@angular/core';
import { Limit } from '@blueriq/angular/lists';
import { BlueriqCommonModule } from '@blueriq/angular';

@Component({
    selector: 'bq-table-limit',
    templateUrl: './table.limit.component.html',
    styleUrls: ['./table.limit.component.scss'],
    imports: [BlueriqCommonModule]
})
export class TableLimitComponent {

  public readonly limit = input<Limit>(undefined!);

}
