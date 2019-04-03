import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Button, Container, PresentationStyles } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { Task } from './task_service';
import { ColumnDefinition, TaskList } from './tasklist';
import { TaskListDataSource } from './tasklist-datasource';

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
export class TaskListComponent implements OnInit {

  displayedColumns: string[];

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  taskDataSource: TaskListDataSource;

  tasksToHighlight: string[];

  constructor(public taskList: TaskList, session: BlueriqSession) {
    this.taskDataSource = new TaskListDataSource(taskList.columnDefinitions, session.localization.dateFormats);
    this.displayedColumns = taskList.columnDefinitions.map(column => column.identifier);
    this.tasksToHighlight = [];
  }

  ngOnInit(): void {
    this.taskDataSource.sort = this.sort;
    this.taskDataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => {
      this.clearTasksToHighlight();
    });

    this.taskList.taskSubject.subscribe(tasks => this.taskDataSource.data = tasks);
    this.taskList.taskEventSubject.subscribe(taskEvent => {
      this.tasksToHighlight.push(taskEvent.taskModel.identifier);
    });
  }

  /** extracts the data that should be shown in the cell that is being rendered */
  getCellData(task: Task, column: ColumnDefinition): string {
    return this.taskDataSource.getCellData(task, column);
  }

  isIconButton(styles: PresentationStyles): boolean {
    return styles.hasAny(BqPresentationStyles.ONLYICON, BqPresentationStyles.DEPRECATED_ONLYICON);
  }

  getColor(styles: PresentationStyles): string | null {
    if (styles.has(BqPresentationStyles.PRIMARY)) {
      return 'primary';
    } else if (styles.has(BqPresentationStyles.ACCENT)) {
      return 'accent';
    } else if (styles.has(BqPresentationStyles.TERTIARY)) {
      return 'tertiary';
    }
    return null;
  }

  /** sends a button pressed event to the backend */
  buttonPressed(button: Button, taskIdentifier: string): void {
    this.taskList.buttonPressed(button, taskIdentifier);
  }

  /** passes a new filter value to the datasource */
  applyFilter(filterValue: string): void {
    this.clearTasksToHighlight();
    this.taskDataSource.filter = filterValue.trim().toLowerCase();
  }

  pageChanged(event: PageEvent): void {
    this.clearTasksToHighlight();
  }

  private clearTasksToHighlight(): void {
    this.tasksToHighlight = [];
  }
}
