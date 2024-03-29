import { Task } from '@blueriq/angular';
import { ColumnDefinition } from '@blueriq/angular/lists';
import { PresentationStyles } from '@blueriq/core';
import { provideDateFormats } from '@shared/date/bq-date-parser';
import { TaskListDataSource } from './tasklist-datasource';

describe('Task List Data Source', () => {
  const tasks: Task[] = [{
    customFields: {
      'project': 'Solar Panels',
      'assignedTo': 'Team 69',
    },
    displayName: 'Task display name',
    dueDate: undefined,
    identifier: 'task id',
    name: 'task name',
    priority: 5,
    required: true,
    startDate: new Date('2019-01-01T12:34:56'),
    status: 'started',
    timeoutDate: new Date('2019-02-02T01:23:45'),
    caseLocked: false,
  }];
  const displayedColumns: ColumnDefinition[] = [{
    action: undefined,
    dataType: 'text',
    header: undefined,
    identifier: 'displayName',
    styles: PresentationStyles.of('style'),
    type: 'TASKDATA',
    sorting: 'asc',
  }, {
    action: undefined,
    dataType: 'text',
    header: undefined,
    identifier: 'status',
    styles: PresentationStyles.of('style'),
    type: 'TASKDATA',
    sorting: 'desc',
  }, {
    action: undefined,
    dataType: 'datetime',
    header: undefined,
    identifier: 'timeoutDate',
    styles: PresentationStyles.of('style'),
    type: 'TASKDATA',
    sorting: undefined,
  }, {
    action: undefined,
    dataType: 'datetime',
    header: undefined,
    identifier: 'project',
    styles: PresentationStyles.of('style'),
    type: 'CUSTOMFIELD',
    sorting: undefined,
  }];

  it('should return the correct task property value', () => {
    const dataSource = new TaskListDataSource(displayedColumns, provideDateFormats());

    let sortValue = dataSource.sortingDataAccessor(tasks[0], 'project');
    expect(sortValue).toBe('Solar Panels');

    sortValue = dataSource.sortingDataAccessor(tasks[0], 'displayName');
    expect(sortValue).toBe('Task display name');

    sortValue = dataSource.sortingDataAccessor(tasks[0], 'duedate');
    expect(sortValue).toBe('');

    sortValue = dataSource.sortingDataAccessor(tasks[0], 'nonexistent');
    expect(sortValue).toBe('');
  });

  it('should apply the filter correctly', () => {
    const dataSource = new TaskListDataSource(displayedColumns, provideDateFormats());

    let shouldDisplay = dataSource.filterPredicate(tasks[0], '');
    expect(shouldDisplay).toBe(true);

    shouldDisplay = dataSource.filterPredicate(tasks[0], 'a');
    expect(shouldDisplay).toBe(true);

    shouldDisplay = dataSource.filterPredicate(tasks[0], 'started');
    expect(shouldDisplay).toBe(true);

    shouldDisplay = dataSource.filterPredicate(tasks[0], '2019');
    expect(shouldDisplay).toBe(true);

    shouldDisplay = dataSource.filterPredicate(tasks[0], '2018');
    expect(shouldDisplay).toBe(false);

    shouldDisplay = dataSource.filterPredicate(tasks[0], 'x');
    expect(shouldDisplay).toBe(false);

  });

  it('should apply the filter case insensitive', () => {
    const dataSource = new TaskListDataSource(displayedColumns, provideDateFormats());

    let shouldDisplay = dataSource.filterPredicate(tasks[0], 'solar');
    expect(shouldDisplay).toBe(true);

    shouldDisplay = dataSource.filterPredicate(tasks[0], 'TASK');
    expect(shouldDisplay).toBe(true);
  });

});
