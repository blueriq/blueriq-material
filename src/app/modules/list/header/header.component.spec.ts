import { Filter, FilterOption, FilterValue, List, TableColumn } from '@blueriq/angular/lists';
import { ButtonTemplate } from '@blueriq/core/testing';
import { of } from 'rxjs';
import { TableHeaderColumnComponent } from './header.component';

describe('TableHeaderColumnComponent', () => {

  let headerComponent: TableHeaderColumnComponent;

  describe('filtering', () => {

    let listSpy: List;
    let filterSpy: Filter;
    let columnSpy;

    beforeEach(() => {
      filterSpy = jasmine.createSpyObj<Filter>(['addFilter']);
      filterSpy.filterValues = [];
      listSpy = { filter$: of(filterSpy) } as any;
      const filterOption = new FilterOption();
      filterOption.title = 'age';
      const filterValue = new FilterValue();
      filterValue.selectedOption = filterOption;
      filterSpy.filterValues.push(filterValue);
      headerComponent = new TableHeaderColumnComponent(listSpy);
      columnSpy = jasmine.createSpyObj<TableColumn>('TableColumn', ['cellFor']);
      headerComponent.column = columnSpy;
    });

    it('column without filtering', (done) => {
      let isColumnFiltered!: boolean;
      headerComponent.isColumnFiltered$.subscribe(isFiltered => {
        isColumnFiltered = isFiltered;
        done();
      }).unsubscribe();

      // verify
      expect(isColumnFiltered).toBe(false);
    });

    it('column with filtering', (done) => {
      // Setup
      // Set column age so the (which is also filtered on) so filtering results in true
      const column: TableColumn | any = {
        header: {
          name: 'age',
        },
      };
      headerComponent.column = column;
      let isColumnFiltered!: boolean;
      headerComponent.isColumnFiltered$.subscribe(isFiltered => {
        isColumnFiltered = isFiltered;
        done();
      }).unsubscribe();

      // verify
      expect(isColumnFiltered).toBe(true);
    });

  });

  describe('sorting', () => {

    let listSpy: List;
    let filterSpy: Filter;
    let columnSpy;

    beforeEach(() => {
      filterSpy = jasmine.createSpyObj<Filter>(['addFilter']);
      listSpy = { filter$: of(filterSpy) } as any;
      headerComponent = new TableHeaderColumnComponent(listSpy);
      columnSpy = jasmine.createSpyObj<TableColumn>('TableColumn', ['cellFor']);
      headerComponent.column = columnSpy;
    });

    it('should display the right material icon if no direction', () => {
      const currentIcon = headerComponent.getIconByDirection();
      expect(currentIcon).toBe('');
      expect(headerComponent.isSorting()).toBeFalsy();
    });

    it('should display the right material icon if direction is descending', () => {
      const column: TableColumn | any = {
        sort: ButtonTemplate.create('sort').styles('descending').build(),
      };
      headerComponent.column = column;
      const currentIcon = headerComponent.getIconByDirection();
      expect(currentIcon).toBe('arrow_upward');
      expect(headerComponent.isSorting()).toBeTruthy();
    });

    it('should display the right material icon if direction is ascending', () => {
      const column: TableColumn | any = {
        sort: ButtonTemplate.create('sort').styles('ascending').build(),
      };
      headerComponent.column = column;
      const currentIcon = headerComponent.getIconByDirection();
      expect(currentIcon).toBe('arrow_downward');
      expect(headerComponent.isSorting()).toBeTruthy();
    });

  });

});

