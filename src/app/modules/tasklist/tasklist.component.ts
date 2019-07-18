import { AfterContentChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Button, Container, PresentationStyles } from '@blueriq/core';
import { Subscription } from 'rxjs';
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
export class TaskListComponent implements OnInit, AfterContentChecked, OnDestroy {

  displayedColumns: string[];

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  taskDataSource: TaskListDataSource;

  tasksToHighlight: string[];

  private sortChangeSubscription: Subscription;
  private tasksSubscription: Subscription;
  private taskEventsSubscription: Subscription;
  private data: Task[] = [];

  constructor(public taskList: TaskList, session: BlueriqSession) {
    this.taskDataSource = new TaskListDataSource(taskList.columnDefinitions, session.localization.dateFormats);
    this.displayedColumns = taskList.columnDefinitions.map(column => column.identifier);
    this.tasksToHighlight = [];
  }

  get noResultsText(): string {
    if (this.taskList.noResults) {
      return this.taskList.noResults.plainText;
    }
    return '';
  }

  ngOnInit(): void {
    this.tasksSubscription = this.taskList.tasks$.subscribe(tasks => this.updateDataSource(tasks));
    this.taskEventsSubscription = this.taskList.taskEvents$.subscribe(taskEvent => {
      this.tasksToHighlight.push(taskEvent.taskModel.identifier);
    });
  }

  ngAfterContentChecked(): void {
    if (this.taskDataSource.sort == null || this.taskDataSource.sort !== this.sort) {
      this.taskDataSource.sort = this.sort;
    }
    if (this.taskDataSource.paginator == null || this.taskDataSource.paginator !== this.paginator) {
      this.taskDataSource.paginator = this.paginator;
    }
    if (this.sort != null) {
      if (this.sortChangeSubscription != null) {
        this.sortChangeSubscription.unsubscribe();
      }
      this.sortChangeSubscription = this.sort.sortChange.subscribe(() => {
        this.clearTasksToHighlight();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.sortChangeSubscription != null) {
      this.sortChangeSubscription.unsubscribe();
    }
    if (this.tasksSubscription != null) {
      this.tasksSubscription.unsubscribe();
    }
    if (this.taskEventsSubscription != null) {
      this.taskEventsSubscription.unsubscribe();
    }
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

  toggleData(): void {
    if (this.taskDataSource.data.length > 0) {
      this.data = Object.assign([], this.taskDataSource.data);
      this.taskDataSource.data = [];
    } else {
      this.taskDataSource.data = Object.assign([], this.data);
      this.data = [];
    }
  }

  /** passes a new filter value to the datasource */
  applyFilter(filterValue: string): void {
    this.clearTasksToHighlight();
    this.taskDataSource.filter = filterValue.trim().toLowerCase();
  }

  pageChanged(): void {
    this.clearTasksToHighlight();
  }

  private clearTasksToHighlight(): void {
    this.tasksToHighlight = [];
  }

  private updateDataSource(tasks: Task[]): void {
    this.taskDataSource.data = tasks;
  }
}
