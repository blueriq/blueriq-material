import { Component, input } from '@angular/core';
import { TableColumn } from '@blueriq/angular/lists';
import { BlueriqCommonModule } from '@blueriq/angular';
import { MatIconButton } from '@angular/material/button';
import { NgClass, AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'bq-header-column',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [BlueriqCommonModule, MatIconButton, NgClass, MatIcon, AsyncPipe]
})
export class TableHeaderColumnComponent {

  readonly column = input.required<TableColumn>();

  getIconByDirection(): string {
    switch (this.column().ordering) {
      case 'unavailable':
        return '';
      case 'descending':
        return 'arrow_downward';
      case 'ascending':
      case 'none':
        return 'arrow_upward';
    }
  }
}
