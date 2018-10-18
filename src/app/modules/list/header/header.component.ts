import { Component, Host, Input, OnInit } from '@angular/core';
import { List, TableColumn } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bq-header-column',
  template: `

    <div class="header" fxLayout="row" fxLayoutAlign="start center" (mouseenter)="column.hover = true" (mouseleave)="column.hover = false">
      <ng-container [bqElement]="column.header"></ng-container>

      <!-- Explain text -->
      <button mat-icon-button [matTooltip]="getTooltip()">
        <mat-icon aria-label="Show explain text">info</mat-icon>
      </button>

      <!-- Sorting -->
      <button *ngIf="!!column.hover || isSorting(column.sort)" mat-icon-button [bqButton]="column.sort">
        <mat-icon aria-label="sort button">{{getIconByDirection(column.sort)}}</mat-icon>
      </button>

      <!-- Filtering -->
      <button mat-icon-button fxLayoutAlign="center center" [disabled]="true">
        <mat-icon *ngIf="isColumnFiltered$ | async">filter_list</mat-icon>
      </button>

    </div>

  `,
  styleUrls: ['./header.component.scss'],
  providers: [List]
})
export class TableHeaderColumnComponent implements OnInit {

  @Input()
  public column: TableColumn;

  isColumnFiltered$: Observable<boolean>;

  constructor(@Host() private readonly list: List, private readonly container: Container) {
    this.isColumnFiltered$ = list.filter$.pipe(
      map(filter => {
        const columnName = this.column.header ? this.column.header.name : undefined;
        if (!filter || columnName === undefined) {
          return false;
        }
        return filter.filterValues.some(value => value.selectedOption ? value.selectedOption.title === columnName : false);
      })
    );
  }

  ngOnInit(): void {
    // TODO delete me
    // TODO header click == sort
  }

  getTooltip(): string {
    return 'nog niks';
  }

  isSorting() {
    if (!this.column.sort) {
      return false;
    }
    return this.column.sort.styles.hasAny('ascending', 'descending');
  }

  getIconByDirection(): string {
    if (!this.column.sort) {
      return '';
    }
    if (this.column.sort.styles.has('ascending')) {
      return 'arrow_downward';
    } else if (this.column.sort.styles.has('descending')) {
      return 'arrow_upward';
    } else {
      return 'arrow_downward';
    }
  }
}
