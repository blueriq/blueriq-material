import { MatDialog, MatDialogRef } from '@angular/material';
import { CurrentFilters, Filter2 } from '@blueriq/angular/lists';
import { TableFilterComponent } from './table.filter.component';
import { FilterValue } from './types';

describe('TableFilterComponent', () => {
  let tableFilterComponent: TableFilterComponent;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<any, any>>;
  let currentFiltersSpy: jasmine.SpyObj<CurrentFilters>;
  let filter: Filter2;

  beforeEach(() => {
    dialogSpy = jasmine.createSpyObj<MatDialog>(['open']);
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any, any>>(['close']);
    currentFiltersSpy = jasmine.createSpyObj<CurrentFilters>(['clear']);
    dialogSpy.open.and.returnValue(dialogRefSpy);
    tableFilterComponent = new TableFilterComponent(dialogSpy);
    filter = {
      currentFilters: currentFiltersSpy, apply: jasmine.createSpy(),
    } as unknown as Filter2;
    tableFilterComponent.filter = filter;
  });

  it('open dialog for filtering', () => {
    // setup
    const template = 'show';

    // SUT
    tableFilterComponent.showFilter(template as any);

    // verify
    expect(dialogSpy.open).toHaveBeenCalledTimes(1);
    expect(dialogSpy.open).toHaveBeenCalledWith(template, {
      minWidth: '700px',
    });
  });

  it('close dialog on filter', () => {
    // SUT
    // show filter dialog
    tableFilterComponent.showFilter('' as any);
    // filter, so dialog closes
    tableFilterComponent.doFilter();

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

});
