import { Filter, FilterOption, FilterValue, List } from '@blueriq/angular/lists';
import { ContainerTemplate } from '@blueriq/core/testing';
import { TableFilterIconComponent } from './table.filter-icon.component';

describe('TableFilterIconComponent', () => {
  let tableFilterIconComponent: TableFilterIconComponent;
  let listSpy;
  let filterSpy;

  beforeEach(() => {
    listSpy = jasmine.createSpyObj<List>(['ngOnDestroy']);
    filterSpy = jasmine.createSpyObj<Filter>(['addFilter']);
    filterSpy.filterValues = [];
    listSpy.filter = filterSpy;
  });

  it('column without filtering', () => {
    // setup
    const container = ContainerTemplate.create().build();
    tableFilterIconComponent = new TableFilterIconComponent(listSpy, container);

    // verify
    expect(tableFilterIconComponent.isColumnFiltered()).toBeFalsy();
  });

  it('column with filtering', () => {
    // setup
    const container = ContainerTemplate.create().contentStyle('listplus_search_integer').properties({ index: 0 }).build();
    const filterOption = new FilterOption();
    filterOption.index = 0;
    const filterValue = new FilterValue();
    filterValue.selectedOption = filterOption;
    listSpy.filter.filterValues.push(filterValue);
    tableFilterIconComponent = new TableFilterIconComponent(listSpy, container);

    // verify
    expect(tableFilterIconComponent.isColumnFiltered()).toBeTruthy();
  });
});
