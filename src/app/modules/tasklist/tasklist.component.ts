import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BlueriqComponent } from '@blueriq/angular';
import { Button, Container, PresentationStyles } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { Task } from './task_service';
import { ColumnDefinition, TaskList } from './tasklist';

@Component({
  selector: 'bq-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
  providers: [TaskList],
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.TASK_LIST,
})
export class TaskListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[];

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  taskDataSource: MatTableDataSource<Task>;

  constructor(public taskList: TaskList) {
    this.taskDataSource = new MatTableDataSource([]);
    this.displayedColumns = taskList.columnDefinitions.map(column => column.identifier);
  }

  ngOnInit(): void {
    this.taskDataSource.sort = this.sort;
    this.taskDataSource.paginator = this.paginator;
    this.taskList.taskSubject.subscribe(tasks => this.taskDataSource.data = tasks);
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
          const dateValue = new Date(value);
          value = dateValue.toDateString();
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

  isIconButton(styles: PresentationStyles): boolean {
    return styles.hasAny(BqPresentationStyles.ONLYICON, BqPresentationStyles.DEPRECATED_ONLYICON);
  }

  /** sends a button pressed event to the backend */
  buttonPressed(button: Button, taskIdentifier: string): void {
    this.taskList.buttonPressed(button, taskIdentifier);
  }

  /** passes a new filter value to the datasource */
  applyFilter(filterValue: string): void {
    this.taskDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.taskDataSource.sortingDataAccessor = (task: Task, columnIdentifier: string): string | number => {
      if (task[columnIdentifier]) {
        return task[columnIdentifier];
      }
      for (const property in task) {
        if (property.toLowerCase() === columnIdentifier) {
          return task[property];
        }
      }
      for (const property in task.customFields) {
        if (property === columnIdentifier) {
          return task.customFields[property];
        }
      }
      return '';
    };
  }
}
