import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Filter, FilteredColumn } from '@blueriq/angular/lists';
import { FilterCandidate } from './types';

const MAX_FILTERS = 8;

@Component({
  selector: 'bq-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [
    trigger('clearFilters', [
      transition(':enter', [
        style({ width: 0, opacity: 0 }),
        animate('300ms ease-in', style({ width: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ width: '*', opacity: 1 }),
        animate('300ms ease-out', style({ width: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class FilterComponent implements OnInit {

  @Input()
  filter: Filter;

  filterCandidates: FilterCandidate[];
  showUnknownLabel: string;
  private filterDialog: MatDialogRef<unknown, unknown>;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updateCandidates(this.filter.currentFilters.map(filter => new FilterCandidate(filter)));

    this.showUnknownLabel = this.filter.currentColumns.map(c => c.labels.showUnknown)[0] || '';
  }

  canAddFilter(): boolean {
    return this.filterCandidates.length < MAX_FILTERS;
  }

  addFilter(): void {
    if (this.canAddFilter()) {
      this.filterCandidates.push(new FilterCandidate());
    }
  }

  applyFilters(): void {
    const filteredColumns = this.filterCandidates
      .map(candidate => candidate.toFilteredColumn())
      .filter((filter): filter is FilteredColumn => !!filter);

    this.filter.apply(filteredColumns);

    this.filterDialog.close();
  }

  clearFilters(): void {
    this.filter.clear();
    this.filterCandidates = [new FilterCandidate()];
  }

  removeFilter(candidateToRemove: FilterCandidate): void {
    this.updateCandidates(this.filterCandidates.filter(candidate => candidate !== candidateToRemove));
  }

  showFilter(dialog: TemplateRef<unknown>): void {
    this.filterDialog = this.dialog.open(dialog);
  }

  private updateCandidates(candidates: FilterCandidate[]): void {
    this.filterCandidates = candidates.length > 0 ? candidates : [new FilterCandidate()];
  }

}
