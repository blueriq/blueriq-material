import { Component, Input, OnInit } from '@angular/core';
import { Filter, FilterOption, FilterValue, OPERATION_TYPES } from '@blueriq/angular/lists';

export class BqFilter {
  filterOption: FilterOption;
  operation: OPERATION_TYPES;
  value: string;
  showUnknown: boolean;
  showAll: boolean;
}

@Component({
  selector: 'bq-table-filter',
  templateUrl: './table.filter.component.html',
  styleUrls: ['./table.filter.component.scss']
})
export class TableFilterComponent implements OnInit {

  filters: BqFilter[] = [];

  @Input()
  private readonly filter: Filter;

  addFilter(): void {
    this.filters.push(new BqFilter());
  }

  doFilter(): void {
    this.filters.forEach(value => this.filter.addFilter(value.filterOption.index, this.createFilterValueFromBqFilter(value)));
    this.filter.applyFilters();
  }

  clearFilter(): void {
    this.filter.clearFilters();
    this.filter.applyFilters();
    this.filters = [new BqFilter()];
  }

  ngOnInit(): void {
    for (let filterValues of Array.from(this.filter.filterValues.values())) {
      const bqFilter = new BqFilter();
      bqFilter.filterOption = this.filter.getFilterOptionByIndex(filterValues.index);
      bqFilter.operation = this.filter.getOperationForFilterValue(filterValues.value);
      bqFilter.value = filterValues.value[bqFilter.operation];
      bqFilter.showAll = filterValues.value.showAll;
      bqFilter.showUnknown = filterValues.value.showUnknown;
      this.filters.push(bqFilter);
    }
  }

  private createFilterValueFromBqFilter(value: BqFilter): FilterValue {
    const filterOption = value.filterOption;
    return this.filter.createFilterValue(filterOption.index, filterOption.type, value.showAll, value.showUnknown, value.operation, value.value);
  }
}
