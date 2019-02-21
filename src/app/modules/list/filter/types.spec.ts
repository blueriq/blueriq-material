import { ColumnFilter, FilterPredicate } from '@blueriq/angular/lists';
import { FilterCandidate } from './types';

describe('FilterCandidate', () => {

  it('can be created from scratch', () => {
    const filterCandidate = new FilterCandidate();

    expect(filterCandidate.selectedColumn).toBeUndefined();
    expect(filterCandidate.predicate).toBeUndefined();
    expect(filterCandidate.valid).toBeFalsy();
  });

  it('can be created from a filter column', () => {
    const column = {} as ColumnFilter;
    const predicate = {} as FilterPredicate;
    const filterCandidate = new FilterCandidate({ column, predicate });

    expect(filterCandidate.selectedColumn).toBe(column);
    expect(filterCandidate.predicate).toBe(predicate);
    expect(filterCandidate.valid).toBeTruthy();
  });

  it('should not be available when incomplete', () => {
    const filterCandidate = new FilterCandidate();

    const filteredColumn = filterCandidate.toFilteredColumn()!;

    expect(filteredColumn).toBeUndefined();
  });

  it('should be converted to filtered column if complete', () => {
    const column = {} as ColumnFilter;
    const predicate = {} as FilterPredicate;
    const filterCandidate = new FilterCandidate({ column, predicate });

    const filteredColumn = filterCandidate.toFilteredColumn()!;

    expect(filteredColumn).toBeDefined();
    expect(filteredColumn.column).toBe(column);
    expect(filteredColumn.predicate).toBe(predicate);
  });

  it('should not be converted to filtered column if invalid', () => {
    const column = {} as ColumnFilter;
    const predicate = {} as FilterPredicate;
    const filterCandidate = new FilterCandidate({ column, predicate });

    filterCandidate.update({ predicate, valid: false });

    const filteredColumn = filterCandidate.toFilteredColumn()!;

    expect(filteredColumn).toBeUndefined();
  });

});
