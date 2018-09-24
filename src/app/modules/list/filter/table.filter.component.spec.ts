import { MatDialog, MatDialogRef } from '@angular/material';
import { Filter, FilterValue } from '@blueriq/angular/lists';
import { TableFilterComponent } from './table.filter.component';

describe('TableValueComponent', () => {
  let tableFilterComponent: TableFilterComponent;
  let dialogSpy;
  let dialogRefSpy;
  let filterSpy;

  beforeEach(() => {
    dialogSpy = jasmine.createSpyObj<MatDialog>(['open']);
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any, any>>(['close']);
    dialogSpy.open.and.returnValue(dialogRefSpy);
    tableFilterComponent = new TableFilterComponent(dialogSpy);
    filterSpy = jasmine.createSpyObj<Filter>(['addFilter', 'applyFilters', 'clearFilters']);
    tableFilterComponent.filter = filterSpy;
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
    // SUT
    // show filter dialog
    tableFilterComponent.showFilter('' as any);
    // filter, so dialog closes
    tableFilterComponent.doFilter();

    // verify
    expect(filterSpy.applyFilters).toHaveBeenCalledTimes(1);
    expect(dialogRefSpy.close).toHaveBeenCalledTimes(1);
  });

  it('should clear the filter and always leave a candidate', () => {
    tableFilterComponent.clearFilters();

    // verify
    expect(filterSpy.clearFilters).toHaveBeenCalledTimes(1);
    // always leave an empty filter to quickly start filtering again
    expect(tableFilterComponent.filterCandidates.length).toEqual(1);
  });

  it('adding and removing filters', () => {
    // SUT
    tableFilterComponent.addFilter();
    tableFilterComponent.addFilter();
    tableFilterComponent.addFilter();

    // verify
    expect(tableFilterComponent.filterCandidates.length).toEqual(3);

    // remove a filter
    tableFilterComponent.removeFilter(tableFilterComponent.filterCandidates[0]);
    expect(tableFilterComponent.filterCandidates.length).toEqual(2);

    // remove a filter that is not in the list, does not change the list
    tableFilterComponent.removeFilter(new FilterValue());
    expect(tableFilterComponent.filterCandidates.length).toEqual(2);
  });

  it('are filters applied', () => {
    // setup
    tableFilterComponent.filter.filterValues = [];

    // verify
    expect(tableFilterComponent.isFiltered()).toEqual('');

    // SUT
    tableFilterComponent.filter.filterValues.push(new FilterValue());

    // verify
    expect(tableFilterComponent.isFiltered()).toEqual('primary');
  });
});
