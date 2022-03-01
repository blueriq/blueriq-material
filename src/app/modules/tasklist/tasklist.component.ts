import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { BlueriqComponent, BlueriqSession, Task } from '@blueriq/angular';
import { ColumnDefinition, TaskList } from '@blueriq/angular/lists';
import { Button, Container, PresentationStyles } from '@blueriq/core';
import { Subscription } from 'rxjs';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';
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
export class TaskListComponent implements OnInit, OnDestroy {

  displayedColumns: string[];

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  taskDataSource: TaskListDataSource;

  defaultSort: Sort;

  private sortChangeSubscription: Subscription;
  private tasksSubscription: Subscription;

  constructor(public taskList: TaskList, session: BlueriqSession) {
    this.taskDataSource = new TaskListDataSource(taskList.columnDefinitions, session.localization.dateFormats);
    this.displayedColumns = taskList.columnDefinitions.map(column => column.identifier);
  }

  get noResultsText(): string {
    if (this.taskList.noResults) {
      return this.taskList.noResults.plainText;
    }
    return '';
  }

  ngOnInit(): void {
    this.initDefaultSorting();

    this.taskDataSource.sort = this.sort;
    this.taskDataSource.paginator = this.paginator;

    this.tasksSubscription = this.taskList.tasks$.subscribe(tasks => this.updateDataSource(tasks));
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    if (this.sortChangeSubscription != null) {
      this.sortChangeSubscription.unsubscribe();
    }
    if (this.tasksSubscription != null) {
      this.tasksSubscription.unsubscribe();
    }
    if (this.taskList) {
      this.taskList.unsubscribeFromTaskStream();
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

  /** passes a new filter value to the datasource */
  applyFilter(filterValue: string): void {
    this.taskDataSource.filter = filterValue.trim();
  }

  private updateDataSource(tasks: Task[]): void {
    const statusToFilterOut = ['completed', 'canceled', 'expired', 'deleted'];
    this.taskDataSource.data = tasks.filter(t => !statusToFilterOut.includes(t.status || ''));
  }

  private initDefaultSorting(): void {
    this.defaultSort = {
      active: '',
      direction: '',
    };
    for (const columnDef of this.taskList.columnDefinitions) {
      if (columnDef.sorting !== undefined) {
        this.defaultSort.active = columnDef.identifier;
        this.defaultSort.direction =  columnDef.sorting;
        break;
      }
    }
  }
}
