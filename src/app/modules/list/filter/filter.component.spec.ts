import { MatDialog, MatDialogRef } from '@angular/material';
import { ColumnFilter, CurrentFilters, Filter2, FilterPredicate } from '@blueriq/angular/lists';
import { FilterComponent } from './filter.component';
import { FilterCandidate } from './types';

describe('FilterComponent', () => {
  let tableFilterComponent: FilterComponent;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<any, any>>;
  let currentFiltersSpy: CurrentFilters;
  let columnFilterSpy: jasmine.SpyObj<ColumnFilter>;
  let filter: Filter2;

  beforeEach(() => {
    dialogSpy = jasmine.createSpyObj<MatDialog>(['open']);
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any, any>>(['close']);
    columnFilterSpy = jasmine.createSpyObj<ColumnFilter>(['clear']);
    currentFiltersSpy = {
      all: [],
      clear: jasmine.createSpy(),
    } as unknown as CurrentFilters;
    dialogSpy.open.and.returnValue(dialogRefSpy);
    tableFilterComponent = new FilterComponent(dialogSpy);
    filter = {
      currentFilters: currentFiltersSpy,
      currentColumns: [],
      apply: jasmine.createSpy(),
    } as unknown as Filter2;
    tableFilterComponent.filter = filter;
    tableFilterComponent.ngOnInit();
  });

  it('open dialog for filtering', () => {
    // setup
    const template = 'show';

    // SUT
    tableFilterComponent.showFilter(template as any);

    // verify
    expect(dialogSpy.open).toHaveBeenCalledTimes(1);
    expect(dialogSpy.open).toHaveBeenCalledWith(template);
  });

  it('close dialog on filter', () => {
    tableFilterComponent.addFilter();
    const predicate: FilterPredicate = {showTrue: true, showFalse: false, showUnknown: false, type: 'boolean'};
    tableFilterComponent.filterCandidates[0].update({predicate: predicate, valid: true});
    tableFilterComponent.filterCandidates[0].selectedColumn = columnFilterSpy;

    // SUT
    // show filter dialog
    tableFilterComponent.showFilter('' as any);
    // filter, so dialog closes
    tableFilterComponent.applyFilters();

    // verify
    expect(filter.apply).toHaveBeenCalledTimes(1);
    expect(dialogRefSpy.close).toHaveBeenCalledTimes(1);
  });

  it('should clear the filter and always leave a candidate', () => {
    tableFilterComponent.clearFilters();

    // verify
    expect(currentFiltersSpy.clear).toHaveBeenCalledTimes(1);
    // always leave an empty filter to quickly start filtering again
    expect(tableFilterComponent.filterCandidates.length).toEqual(1);
  });

  it('adding and removing filters', () => {
    // SUT
    tableFilterComponent.addFilter();
    tableFilterComponent.addFilter();

    // verify
    expect(tableFilterComponent.filterCandidates.length).toEqual(3);

    // remove a filter
    tableFilterComponent.removeFilter(tableFilterComponent.filterCandidates[0]);
    expect(tableFilterComponent.filterCandidates.length).toEqual(2);

    // remove a filter that is not in the list, does not change the list
    tableFilterComponent.removeFilter(new FilterCandidate());
    expect(tableFilterComponent.filterCandidates.length).toEqual(2);
  });

});
