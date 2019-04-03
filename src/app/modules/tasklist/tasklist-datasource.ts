import { MatTableDataSource } from '@angular/material';
import { DateFormats } from '@blueriq/core';
import { Task } from './task_service';
import { ColumnDefinition } from './tasklist';

export class TaskListDataSource extends MatTableDataSource<Task> {

  constructor(private readonly displayedColumns: ColumnDefinition[],
              private readonly dateFormats: DateFormats) {
    super([]);
  }

  /** extracts the data that should be shown in the cell that is being rendered */
  getCellData(task: Task, column: ColumnDefinition): string {
    const identifier = column.identifier;
    switch (column.type) {
      case 'TASKDATA':
        let value = '';
        if (task[identifier]) {
          value = task[identifier] || '';
        } else {
          // identifier might be lowercased in runtime conversion
          for (const property in task) {
            if (property.toLowerCase() === identifier) {
              value = task[property] || '';
              break;
            }
          }
        }
        if (!!value && (column.dataType === 'date' || column.dataType === 'datetime')) {
          value = this.formatDateValue(value, column.dataType === 'datetime');
        }
        return value;
      case 'CUSTOMFIELD':
        if (task.customFields && task.customFields[column.identifier]) {
          return task.customFields[column.identifier];
        }
        return '';
    }
    return '';
  }

  sortingDataAccessor = (task: Task, columnIdentifier: string): string | number => {
    for (const column of this.displayedColumns) {
      if (column.identifier === columnIdentifier) {
        return this.getCellData(task, column);
      }
    }
    return '';
  };

  filterPredicate = (task: Task, filter: string): boolean => {
    // No filter: everything matches
    if (filter === '') {
      return true;
    }
    for (const column of this.displayedColumns) {
      const value = this.getCellData(task, column);
      // Empty cell or matching cell matches filter
      if (value.indexOf(filter) >= 0) {
        return true;
      }
    }
    return false;
  };

  private formatDateValue(dateString: string, includeTime = false): string {
    const date = new Date(dateString);
    return includeTime ? this.dateFormats.dateTime.format(date) : this.dateFormats.date.format(date);
  }

}
