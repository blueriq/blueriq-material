import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';
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
export class TasklistComponent {

  displayedColumns: string[];

  constructor(@Host() public tasklist: TaskList) {
    this.displayedColumns = tasklist.columnDefinitions.map(column => column.identifier);
  }

  getCellData(task: Task, column: ColumnDefinition) {
    switch (column.type) {
      case 'TASKDATA':
        return task[column.identifier];
      case 'ACTION':
        return 'cavia';
      default:
        return 'pinguin';
    }
  }
}
