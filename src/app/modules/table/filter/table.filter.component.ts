import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Filter, FilterValue } from '@blueriq/angular/lists';

@Component({
  selector: 'bq-table-filter',
  templateUrl: './table.filter.component.html',
  styleUrls: ['./table.filter.component.scss']
})
export class TableFilterComponent implements OnInit {

  filterCandidates: FilterValue[] = [];
  @Input()
  readonly filter: Filter;
  private filterDialog: MatDialogRef<any, any>;

  constructor(public dialog: MatDialog) {
  }

  addFilter(): void {
    this.filterCandidates.push(new FilterValue());
  }

  doFilter(): void {
    this.filter.filterValues = [];
    this.filterCandidates.forEach(value => this.filter.addFilter(value));
    this.filter.applyFilters();
    this.filterDialog.close();
  }

  clearFilters(): void {
    this.filter.clearFilters();
    this.filterCandidates = [new FilterValue()];
    this.filterDialog.close();
  }

  removeFilter(filterValue: FilterValue): void {
    this.filterCandidates.forEach((filter, index) => {
      if (filter === filterValue) {
        this.filterCandidates.splice(index, 1);
      }
    });
  }

  showFilter(templateRef: TemplateRef<any>): void {
    this.filterDialog = this.dialog.open(templateRef);
  }

  isFiltered(): string {
    if (this.filter.filterValues.length > 0) {
      return 'primary';
    }
    return '';
  }

  ngOnInit(): void {
    this.filterCandidates = this.filter.filterValues.length > 0 ? this.filter.filterValues : [new FilterValue()];
  }
}
