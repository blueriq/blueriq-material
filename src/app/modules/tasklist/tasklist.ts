import { Host, Injectable, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BlueriqChild, BlueriqChildren, BlueriqQuerying, BlueriqSession } from '@blueriq/angular';
import { Button, Container, DataType, PresentationStyles, TextItem } from '@blueriq/core';
import { Subscription } from 'rxjs/Subscription';
import { Task, TaskService } from './task_service';

export interface ColumnDefinition {
  type: 'ACTION' | 'CUSTOMFIELD' | 'TASKDATA';
  identifier: string;
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

  columnDefinitions: ColumnDefinition[] = [];
  pagingSize: number;
  lockedStyle: string | undefined;
  tasks: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  @BlueriqChildren(Container, 'header_cell', { required: true })
  headerContainers: Container[];
  @BlueriqChild(TextItem, { optional: true })
  noResults: TextItem;
  private taskSubscription: Subscription;
  private DEFAULT_PAGING_SIZE = 10;
  private containerUuid: string;

  constructor(@Host() container: Container, private readonly taskService: TaskService,
              private readonly session: BlueriqSession,
              private readonly querying: BlueriqQuerying) {
    this.querying.attach(this);
    this.pagingSize = container.properties['pagingsize'] ? container.properties['pagingsize'] : this.DEFAULT_PAGING_SIZE;
    this.lockedStyle = container.properties['lockedstyle'];
    this.containerUuid = container.properties['containeruuid'];
    this.initColumnDefinitions();

    this.connect();
  }

  connect(): void {
    // Subscribe for changes
    // TODO: handle data that is out of sync

    this.taskSubscription = this.taskService.getTaskEvents(this.containerUuid).subscribe(taskEvent => {
      const data = this.tasks.data;

      switch (taskEvent.action) {
        case 'CREATED':
          data.push(taskEvent.taskModel);
          break;
        case 'UPDATED':
          data.forEach((item: Task, index) => {
            if (item.identifier === taskEvent.taskModel.identifier) {
              data[index] = taskEvent.taskModel;
            }
          });
          break;
        case 'DELETED':
          data.forEach((item: Task, index) => {
            if (item.identifier === taskEvent.taskModel.identifier) {
              data.splice(index, 1);
            }
          });
          break;
      }

      this.tasks.data = data;
    });

    // InitialData
    this.taskSubscription = this.taskService.getAllTasks(this.session.current, this.containerUuid).subscribe(tasks => {
      this.tasks.data = tasks;
    });
  }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe();
    this.querying.detach(this);
  }

  public buttonPressed(button: Button, taskIdentifier: string): void {
    this.session.pressed(button, { taskIdentifier: [taskIdentifier] });
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

