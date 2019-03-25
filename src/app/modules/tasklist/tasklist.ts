import { Host, Injectable, OnDestroy } from '@angular/core';
import { BlueriqChild, BlueriqChildren, BlueriqQuerying, BlueriqSession } from '@blueriq/angular';
import { Button, Container, DataType, PresentationStyles, TextItem } from '@blueriq/core';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Task, TaskEvent, TaskService } from './task_service';

export interface ColumnDefinition {
  type: 'ACTION' | 'CUSTOMFIELD' | 'TASKDATA';
  identifier: string;
  header: string | undefined;
  styles: PresentationStyles;
  action: Button | undefined;
  dataType: DataType;
}

/**
 * This service is supposed to be declared as provider for a container with content style 'taskList' and then
 * injected into its constructor as a {@link Self} dependency.
 */
@Injectable()
export class TaskList implements OnDestroy {

  columnDefinitions: ColumnDefinition[];
  pagingSize: number;
  lockedStyle: string | undefined;
  @BlueriqChildren(Container, 'header_cell', { required: true })
  headerContainers: Container[];
  @BlueriqChild(TextItem, { optional: true })
  noResults: TextItem;
  taskSubject: BehaviorSubject<Task[]>;

  private taskEventSubscription: Subscription;
  private DEFAULT_PAGING_SIZE = 10;
  private containerUuid: string;

  constructor(@Host() container: Container, private readonly taskService: TaskService,
              private readonly session: BlueriqSession,
              private readonly querying: BlueriqQuerying) {
    this.querying.attach(this);
    this.columnDefinitions = [];
    this.pagingSize = container.properties['pagingsize'] ? container.properties['pagingsize'] : this.DEFAULT_PAGING_SIZE;
    this.lockedStyle = container.properties['lockedstyle'];
    this.containerUuid = container.properties['containeruuid'];

    this.taskSubject = new BehaviorSubject<Task[]>([]);

    this.initColumnDefinitions();
    this.obtainInitialTasks().add(() => {
      this.subscribeToTaskEvents();
    });
  }

  buttonPressed(button: Button, taskIdentifier: string): void {
    this.session.pressed(button, { taskIdentifier: [taskIdentifier] });
  }

  ngOnDestroy(): void {
    this.taskEventSubscription.unsubscribe();
    this.querying.detach(this);
  }

  public handleTaskEvent(taskEvent: TaskEvent): void {
    const tasks = this.taskSubject.getValue();

    if (taskEvent.taskModel.status === 'completed') {
      // In our implementation, we delete tasks that are completed from the list
      taskEvent.action = 'DELETED';
    }

    switch (taskEvent.action) {
      case 'CREATED':
        tasks.push(taskEvent.taskModel);
        break;
      case 'UPDATED':
        tasks.forEach((item: Task, index) => {
          if (item.identifier === taskEvent.taskModel.identifier) {
            tasks[index] = taskEvent.taskModel;
          }
        });
        break;
      case 'DELETED':
        tasks.forEach((item: Task, index) => {
          if (item.identifier === taskEvent.taskModel.identifier) {
            tasks.splice(index, 1);
          }
        });
        break;
    }

    this.taskSubject.next(tasks);
  }

  private subscribeToTaskEvents(): void {
    this.taskEventSubscription = this.taskService.getTaskEvents(this.containerUuid).subscribe(event => {
      this.handleTaskEvent(event);
    });
  }

  private obtainInitialTasks(): Subscription {
    return this.taskService.getAllTasks(this.session.current, this.containerUuid).subscribe(tasks => {
      this.taskSubject.next(tasks);
    });
  }

  private initColumnDefinitions(): void {
    this.headerContainers.forEach(headerContainer => {
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
        type: headerContainer.properties['type'],
        identifier: headerContainer.properties['identifier'],
        header,
        action,
        styles: headerContainer.styles,
        dataType: headerContainer.properties['datatype'],
      });
    });
  }
}

