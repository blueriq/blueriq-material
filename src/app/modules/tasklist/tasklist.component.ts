import { Component, Host } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { Task } from './task_service';
import { TaskList } from './tasklist';

@Component({
  selector: 'bq-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
  providers: [TaskList],
})
@BlueriqComponent({
  type: Container,
  selector: 'tasklist',
})
export class TasklistComponent {
  public dataSource: MatTableDataSource<Task>;

  constructor(@Host() public tasklist: TaskList) {
    this.dataSource = new MatTableDataSource(tasklist.tasks);
  }
}
