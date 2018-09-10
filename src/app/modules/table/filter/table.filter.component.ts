import { Component, Input, OnInit } from '@angular/core';
import { Filter, FilterValue } from '@blueriq/angular/lists';

@Component({
  selector: 'bq-table-filter',
  templateUrl: './table.filter.component.html',
  styleUrls: ['./table.filter.component.scss']
})
export class TableFilterComponent implements OnInit {

  filterCandidates: FilterValue[] = [];
  showFilter = false;

  @Input()
  private readonly filter: Filter;

  addFilter(): void {
    this.filterCandidates.push(new FilterValue());
  }

  doFilter(): void {
    this.filterCandidates.forEach(value => this.filter.addFilter(value));
    this.filter.applyFilters();
    this.toggleFilter();
  }

  clearFilters(): void {
    this.filter.clearFilters();
    this.filterCandidates = [];
    this.toggleFilter();
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  ngOnInit(): void {
    this.filterCandidates = this.filter.filterValues.length > 0 ? this.filter.filterValues : [new FilterValue()];
  }
}
