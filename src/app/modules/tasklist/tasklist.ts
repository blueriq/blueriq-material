import { Host, Injectable, OnDestroy } from '@angular/core';
import { BlueriqChild, BlueriqChildren, BlueriqQuerying, BlueriqSession } from '@blueriq/angular';
import { Button, Container, DataType, PresentationStyles, TextItem } from '@blueriq/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { CaseEvent, Task, TaskEvent, TaskService } from './task_service';

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
  tasks$: BehaviorSubject<Task[]>;
  taskEvents$: Subject<TaskEvent>;
  caseEvents$: Subject<CaseEvent>;

  private caseLocked = false;
  private caseEventSubscription: Subscription;
  private taskEventSubscription: Subscription;
  private DEFAULT_PAGING_SIZE = 10;
  private containerUuid: string;

  constructor(@Host() container: Container, private readonly taskService: TaskService,
              private readonly session: BlueriqSession,
              private readonly querying: BlueriqQuerying) {
    this.querying.attach(this);
    this.columnDefinitions = [];
    this.pagingSize = container.properties['pagingsize'] ? parseInt(container.properties['pagingsize'], 10) : this.DEFAULT_PAGING_SIZE;
    this.lockedStyle = container.properties['lockedstyle'];
    this.containerUuid = container.properties['containeruuid'];

    this.tasks$ = new BehaviorSubject<Task[]>([]);
    this.caseEvents$ = new Subject<CaseEvent>();
    this.taskEvents$ = new Subject<TaskEvent>();

    this.initColumnDefinitions();
    this.obtainInitialTasks().add(() => {
      this.subscribeToCaseEvents();
      this.subscribeToTaskEvents();
    });
  }

  buttonPressed(button: Button, taskIdentifier: string): void {
    this.session.pressed(button, { taskIdentifier: [taskIdentifier] });
  }

  ngOnDestroy(): void {
    if (this.caseEventSubscription) {
      this.caseEventSubscription.unsubscribe();
    }
    if (this.taskEventSubscription) {
      this.taskEventSubscription.unsubscribe();
    }
    this.querying.detach(this);
  }

  public isCaseLocked(): boolean {
    return this.caseLocked;
  }

  public handleTaskEvent(taskEvent: TaskEvent): void {
    taskEvent.taskModel.caseLocked = this.caseLocked;

    const tasks = this.tasks$.getValue();

    switch (taskEvent.action) {
      case 'CREATED':
        const existingTask = tasks.find(task => task.identifier === taskEvent.taskModel.identifier);
        if (!existingTask) {
          tasks.push(taskEvent.taskModel);
          this.taskEvents$.next(taskEvent);
        }
        break;
      case 'UPDATED':
        tasks.forEach((item: Task, index) => {
          if (item.identifier === taskEvent.taskModel.identifier) {
            tasks[index] = taskEvent.taskModel;
            this.taskEvents$.next(taskEvent);
          }
        });
        break;
      case 'CANCELED':
      case 'COMPLETED':
      case 'EXPIRED':
      case 'DELETED':
        tasks.forEach((item: Task, index) => {
          if (item.identifier === taskEvent.taskModel.identifier) {
            tasks.splice(index, 1);
            this.taskEvents$.next(taskEvent);
          }
        });
        break;
    }

    this.tasks$.next(tasks);
  }

  public handleCaseEvent(event: CaseEvent): void {
    if (event.caseModel.status === 'LOCKED' && !this.caseLocked) {
      this.caseLocked = true;
      this.updateCaseLockedStatusForTasks();
    } else if (event.caseModel.status !== 'LOCKED' && this.caseLocked) {
      this.caseLocked = false;
      this.updateCaseLockedStatusForTasks();
    }
  }

  private updateCaseLockedStatusForTasks(): void {
    const tasks = this.tasks$.getValue();
    tasks.forEach(task => task.caseLocked = this.caseLocked);
    this.tasks$.next(tasks);
  }

  private subscribeToCaseEvents(): void {
    this.caseEventSubscription = this.taskService.getCaseEvents(this.containerUuid).subscribe(event => this.handleCaseEvent(event));
  }

  private subscribeToTaskEvents(): void {
    this.taskEventSubscription = this.taskService.getTaskEvents(this.containerUuid).subscribe(event => {
      this.handleTaskEvent(event);
    });
  }

  private obtainInitialTasks(): Subscription {
    return this.taskService.getAllTasks(this.session.current, this.containerUuid).subscribe(tasks => {
      this.tasks$.next(tasks);
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

