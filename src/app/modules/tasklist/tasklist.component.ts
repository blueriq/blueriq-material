import { Component, Host, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BlueriqComponent } from '@blueriq/angular';
import { Button, Container } from '@blueriq/core';
import { Task } from './task_service';
import { ColumnDefinition, TaskList } from './tasklist';

@Component({
  selector: 'bq-tasklist',
  templateUrl: './tasklist.component.html',
  // styleUrls: ['./tasklist.component.scss'],
  providers: [TaskList],
})
@BlueriqComponent({
  type: Container,
  selector: 'tasklist',
})
export class TaskListComponent implements OnInit {

  displayedColumns: string[];

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(@Host() public tasklist: TaskList) {
    this.displayedColumns = tasklist.columnDefinitions.map(column => column.identifier);
  }

  getCellData(task: Task, column: ColumnDefinition) {
    let identifier = column.identifier;
    if (identifier === 'displayname') {
      identifier = 'displayName';
    }
    switch (column.type) {
      case 'TASKDATA':
        return task[identifier];
      default:
        return '';
    }
  }

  buttonPressed(button: Button, taskIdentifier: string) {
    this.tasklist.buttonPressed(button, taskIdentifier);
  }

  applyFilter(filterValue: string) {
    this.tasklist.tasks.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.tasklist.tasks.sort = this.sort;
    this.tasklist.tasks.paginator = this.paginator;
  }
}
