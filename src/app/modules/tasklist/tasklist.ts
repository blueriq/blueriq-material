import { Host, Injectable, OnDestroy } from '@angular/core';
import { BlueriqChild, BlueriqChildren } from '@blueriq/angular';
import { Button, Container, DataType, PresentationStyles, TextItem } from '@blueriq/core';
import { Subscription } from 'rxjs/Subscription';
import { Task, TaskService } from './task_service';

export interface ColumnDefinition {
  header: string | undefined;
  styles: PresentationStyles;
  action: Button | undefined;
  dataType: DataType;
}

/**
 * This service is supposed to be declared as provider for a container with content style 'tasklist' and then
 * injected into its constructor as a {@link Self} dependency.
 */
@Injectable()
export class TaskList implements OnDestroy {

  columnDefinitions: ColumnDefinition[];
  pagingSize: number;
  lockedStyle: string | undefined;
  tasks: Task[] = [];
  @BlueriqChildren(Container, 'header_cell', { required: true })
  private headerContainers: Container[];
  @BlueriqChild(TextItem, { optional: true })
  private noResults: TextItem;
  @BlueriqChild(Button, '.TaskListActionButton', { optional: true })
  private phantomButton: Button;
  private taskSubscription: Subscription;
  private taskEventSubscription: Subscription;
  private DEFAULT_PAGING_SIZE: 10;
  private containerId: string;

  constructor(@Host() container: Container, private readonly taskService: TaskService) {
    this.pagingSize = container.properties['pagingSize'] ? container.properties['pagingSize'] : this.DEFAULT_PAGING_SIZE;
    this.lockedStyle = container.properties['lockedStyle'];
    this.initColumnDefinitions();
    this.containerId = container.key;

    this.connect();
  }

  connect(): void {
    // Subscribe for changes
    // TODO: handle data that is out of sync
    this.taskEventSubscription = this.taskService.getTaskEvents().subscribe(taskEvent => {
      switch (taskEvent.action) {
        case 'CREATED':
          this.tasks.push(taskEvent.task);
          break;
        case 'UPDATED':
          this.tasks.forEach((item: Task, index) => {
            if (item.id === taskEvent.task.id) {
              this.tasks[index] = taskEvent.task;
            }
          });
          break;
        case 'DELETED':
          this.tasks.forEach((item: Task, index) => {
            if (item.id === taskEvent.task.id) {
              this.tasks.splice(index, 1);
            }
          });
          break;
      }
    });

    // InitialData
    this.taskSubscription = this.taskService.getAllTasks(this.containerId).subscribe(tasks => {
      // TODO, merge the arrays?
      this.tasks = tasks;
    });
  }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe();
    this.taskEventSubscription.unsubscribe();
  }

  private initColumnDefinitions(): void {
    for (const headerContainer of this.headerContainers) {
      let header: string | undefined;
      let action: Button | undefined;
      for (const child of headerContainer.children) {
        if (child instanceof TextItem) {
          header = child.plainText;
        }
        if (child instanceof Button) {
          action = child;
        }
      }
      this.columnDefinitions.push({
        header, action, styles: headerContainer.styles,
        dataType: 'text',
      });
    }
  }
}
