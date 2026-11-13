import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Filter, FilteredColumn } from '@blueriq/angular/lists';
import { FilterCandidate } from './types';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatBadge } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { FilterRowComponent } from './filter-row/filter-row.component';

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
    imports: [MatIconButton, MatTooltip, MatBadge, MatIcon, MatLabel, FilterRowComponent, MatButton]
})
export class FilterComponent implements OnInit {
  dialog = inject(MatDialog);


  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  filter: Filter;

  filterCandidates: FilterCandidate[];
  showUnknownLabel: string;
  private filterDialog: MatDialogRef<unknown, unknown>;

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
