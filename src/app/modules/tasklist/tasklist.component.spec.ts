import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate, TextItemTemplate } from '@blueriq/core/testing';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import { EmptyObservable } from 'rxjs-compat/observable/EmptyObservable';
import { AssetModule } from '../asset/asset.module';
import { ButtonModule } from '../button/button.module';
import { ContainerModule } from '../container/container.module';
import { TextItemModule } from '../textitem/textitem.module';
import { Task, TaskEvent, TaskService } from './task_service';
import { TaskListComponent } from './tasklist.component';
import { TaskListModule } from './tasklist.module';

describe('Task List Component', () => {
  let taskListTemplate: ContainerTemplate;
  let component: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    taskService = jasmine.createSpyObj('TaskService', ['getAllTasks', 'getTaskEvents']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ContainerModule,
        ButtonModule,
        TextItemModule,
        AssetModule,
        TaskListModule,
      ],
      providers: [
        { provide: TaskService, useValue: taskService },
      ],
    });
  }));

  describe('Task list', () => {
    beforeEach(() => {
      taskListTemplate = ContainerTemplate.create();
      taskListTemplate.contentStyle('tasklist');

      taskListTemplate.children(
        ContainerTemplate
        .create('cell')
        .contentStyle('header_cell')
        .properties({
          type: 'TASKDATA',
          identifier: 'displayname',
          dataType: 'text',
        })
        .children(
          TextItemTemplate.create('Name').plainText('Name'),
        ),
        ContainerTemplate
        .create('cell')
        .contentStyle('header_cell')
        .properties({
          type: 'TASKDATA',
          identifier: 'status',
          dataType: 'text',
        })
        .children(
          TextItemTemplate.create('Status').plainText('Status'),
        ),
        ContainerTemplate
        .create('cell')
        .contentStyle('header_cell')
        .properties({
          type: 'CUSTOMFIELD',
          identifier: 'customField',
          dataType: 'text',
        })
        .children(
          TextItemTemplate.create('CustomField').plainText('Custom field'),
        ),
        ContainerTemplate
        .create('cell')
        .contentStyle('header_cell')
        .properties({
          type: 'ACTION',
          identifier: 'actionButton',
        })
        .children(
          ButtonTemplate.create('button').caption('Klik op mij'),
        ),
        TextItemTemplate.create('NoResults').plainText('Nothing to see here'),
      );

      taskService.getAllTasks.and.returnValue(Observable.of(
        [{
          caseIdentifier: 'testcase', // haha
          identifier: '123abc',
          name: 'task',
          displayName: 'Taak',
          status: 'open',
          customFields: {
            customField: 'custom',
          },
        }, {
          caseIdentifier: 'kees',
          identifier: '456',
          name: 'task2',
          displayName: 'Taak 2',
          status: 'started',
          customFields: {},
        }] as Task[],
      ));
      taskService.getTaskEvents.and.returnValue(new EmptyObservable<TaskEvent>());
    });

    it('should have a row with correct header content', () => {
      component = BlueriqSessionTemplate.create().build(taskListTemplate).get(TaskListComponent);

      const headerRows = component.nativeElement.querySelectorAll('.mat-header-row');
      expect(headerRows.length).toBe(1);

      const headerCells = headerRows[0].querySelectorAll('.mat-header-cell');

      expect(headerCells.length).toBe(4);
      expect(headerCells[0].innerText.trim()).toBe('Name');
      expect(headerCells[1].innerText.trim()).toBe('Status');
      expect(headerCells[2].innerText.trim()).toBe('Custom field');

      // Although a button is modelled, it should not be visible in the header row, but in the body cells
      const buttons = headerCells[3].querySelectorAll('.mat-raised-button');
      expect(buttons.length).toBe(0);
    });

    it('should display content correctly', () => {
      component = BlueriqSessionTemplate.create().build(taskListTemplate).get(TaskListComponent);
      const matRows = component.nativeElement.querySelectorAll('.mat-row');
      expect(matRows.length).toBe(2);

      const firstRowColumns = matRows[0].querySelectorAll('.mat-cell');
      expect(firstRowColumns.length).toBe(4);
      expect(firstRowColumns[0].innerText).toBe('Taak');
      expect(firstRowColumns[1].innerText).toBe('open');
      expect(firstRowColumns[2].innerText).toBe('custom');
      const firstRowButtons = firstRowColumns[3].querySelectorAll('.mat-raised-button');
      expect(firstRowButtons.length).toBe(1);
      expect(firstRowButtons[0].innerText).toBe('Klik op mij');

      const secondRowColumns = matRows[1].querySelectorAll('.mat-cell');
      expect(secondRowColumns.length).toBe(4);
      expect(secondRowColumns[0].innerText).toBe('Taak 2');
      expect(secondRowColumns[1].innerText).toBe('started');
      expect(secondRowColumns[2].innerText).toBe('');
      const secondRowButtons = secondRowColumns[3].querySelectorAll('.mat-raised-button');
      expect(secondRowButtons.length).toBe(1);
      expect(secondRowButtons[0].innerText).toBe('Klik op mij');
    });

    it('should not display rows when the list is empty', () => {
      taskService.getAllTasks.and.returnValue(new EmptyObservable<Task[]>());

      component = BlueriqSessionTemplate.create().build(taskListTemplate).get(TaskListComponent);
      const matRows = component.nativeElement.querySelectorAll('.mat-row');
      expect(matRows.length).toBe(0);
    });
  });

  describe('Task list provider', () => {
    beforeEach(() => {
      taskService.getAllTasks.and.returnValue(Observable.of([] as Task[]));
      taskService.getTaskEvents.and.returnValue(new EmptyObservable<TaskEvent>());
    });

    it('should handle CREATED events correctly', () => {
      component = BlueriqSessionTemplate.create().build(taskListTemplate).get(TaskListComponent);
      const provider = component.componentInstance.taskList;
      const subject = provider.taskSubject;

      expect(subject.getValue()).toEqual([]);

      const task: Task = {
        caseIdentifier: '42',
        identifier: '123',
        name: 'createTask',
        status: 'open',
      } as Task;

      const createEvent: TaskEvent = {
        action: 'CREATED',
        taskModel: task,
      };

      provider.handleTaskEvent(createEvent);

      expect(subject.getValue()).toEqual([task]);
    });

    it('should handle UPDATED events correctly', () => {
      component = BlueriqSessionTemplate.create().build(taskListTemplate).get(TaskListComponent);
      const provider = component.componentInstance.taskList;
      const subject = provider.taskSubject;

      const task: Task = {
        caseIdentifier: '222',
        identifier: '111',
        name: 'task',
        status: 'open',
      } as Task;

      subject.next([task]);
      provider.handleTaskEvent({ action: 'UPDATED', taskModel: task });
      expect(subject.getValue()).toEqual([task]);

      // When a task is completed, it should be deleted from the list
      task.status = 'completed';
      provider.handleTaskEvent({ action: 'UPDATED', taskModel: task });
      expect(subject.getValue()).toEqual([]);
    });

    it('should handle DELETED events correctly', () => {
      component = BlueriqSessionTemplate.create().build(taskListTemplate).get(TaskListComponent);
      const provider = component.componentInstance.taskList;
      const subject = provider.taskSubject;

      const task: Task = {
        caseIdentifier: '333',
        identifier: '444',
        name: 'taak',
        status: 'open',
      } as Task;

      subject.next([task]);
      provider.handleTaskEvent({ action: 'DELETED', taskModel: task });
      expect(subject.getValue()).toEqual([]);
    });
  });
});
