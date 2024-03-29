import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { BlueriqComponent, BlueriqSession, Task, TaskCollection } from '@blueriq/angular';
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
    this.sortChangeSubscription = this.sort.sortChange.subscribe();
  }

  @HostListener('window:beforeunload')
  closeSseStreamOnWindowClose() {
    this.taskList?.unsubscribeFromTaskStream();
  }

  ngOnDestroy() {
    this.sortChangeSubscription?.unsubscribe();
    this.tasksSubscription?.unsubscribe();
  }

  /** extracts the data that should be shown in the cell that is being rendered */
  getCellData(task: Task, column: ColumnDefinition): string {
    return this.taskDataSource.getCellData(task, column);
  }

  isIconButton(styles: PresentationStyles): boolean {
    return styles.hasAny(BqPresentationStyles.ONLYICON, BqPresentationStyles.DEPRECATED_ONLYICON);
  }

  getColor(styles: PresentationStyles): ThemePalette | null {
    if (styles.has(BqPresentationStyles.PRIMARY)) {
      return 'primary';
    } else if (styles.has(BqPresentationStyles.ACCENT)) {
      return 'accent';
    } else {
      return null;
    }
  }

  /** sends a button pressed event to the backend */
  buttonPressed(button: Button, taskIdentifier: string): void {
    this.taskList.buttonPressed(button, taskIdentifier);
  }

  /** passes a new filter value to the datasource */
  applyFilter(filterValue: string): void {
    this.taskDataSource.filter = filterValue.trim();
  }

  private updateDataSource(tasks: TaskCollection): void {
    if (tasks.taskModels) {
      const statusToFilterOut = ['completed', 'canceled', 'expired', 'deleted'];
      this.taskDataSource.data = tasks.taskModels.filter(t => !statusToFilterOut.includes(t.status || ''));
    }
  }

  private initDefaultSorting(): void {
    this.defaultSort = {
      active: '',
      direction: '',
    };
    for (const columnDef of this.taskList.columnDefinitions) {
      if (columnDef.sorting !== undefined) {
        this.defaultSort.active = columnDef.identifier;
        this.defaultSort.direction = columnDef.sorting;
        break;
      }
    }
  }

  isDisabled(button: Button, taskIdentifier: string): boolean {
    const tasks = this.taskList.tasks$.getValue();
    const task = tasks.taskModels.find(t => t.identifier === taskIdentifier);
    return button.disabled || task?.status !== 'open' || this.taskIsLocked(task);
  }

  private taskIsLocked(task: Task | undefined): boolean {
    if (task?.caseLocked !== undefined) {
      return task?.caseLocked;
    }
    return false;
  }
}
