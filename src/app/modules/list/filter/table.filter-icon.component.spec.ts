import { Filter, FilterOption, FilterValue, List } from '@blueriq/angular/lists';
import { ContainerTemplate } from '@blueriq/core/testing';
import { of } from 'rxjs';
import { TableFilterIconComponent } from './table.filter-icon.component';

describe('TableFilterIconComponent', () => {
  let tableFilterIconComponent: TableFilterIconComponent;
  let listSpy: List;
  let filterSpy: Filter;

  beforeEach(() => {
    filterSpy = jasmine.createSpyObj<Filter>(['addFilter']);
    filterSpy.filterValues = [];
    listSpy = { filter$: of(filterSpy) } as any;
  });

  it('column without filtering', () => {
    // setup
    const container = ContainerTemplate.create().build();
    tableFilterIconComponent = new TableFilterIconComponent(listSpy, container);

    let isColumnFiltered!: boolean;
    tableFilterIconComponent.isColumnFiltered$.subscribe(isFiltered => isColumnFiltered = isFiltered).unsubscribe();

    // verify
    expect(isColumnFiltered).toBe(false);
  });

  it('column with filtering', () => {
    // setup
    const container = ContainerTemplate.create().contentStyle('listplus_search_integer')
      .properties({ index: 0 }).build();
    const filterOption = new FilterOption();
    filterOption.index = 0;
    const filterValue = new FilterValue();
    filterValue.selectedOption = filterOption;
    filterSpy.filterValues.push(filterValue);
    tableFilterIconComponent = new TableFilterIconComponent(listSpy, container);

    let isColumnFiltered!: boolean;
    tableFilterIconComponent.isColumnFiltered$.subscribe(isFiltered => isColumnFiltered = isFiltered).unsubscribe();

    // verify
    expect(isColumnFiltered).toBe(true);
  });
});
