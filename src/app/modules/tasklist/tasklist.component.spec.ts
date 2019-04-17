import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { Button } from '@blueriq/core';
import { ButtonTemplate, ContainerTemplate, TextItemTemplate } from '@blueriq/core/testing';
import { EMPTY, of } from 'rxjs';
import { AssetModule } from '../asset/asset.module';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { ButtonModule } from '../button/button.module';
import { ContainerModule } from '../container/container.module';
import { TextItemModule } from '../textitem/textitem.module';
import { Case, Task, TaskEvent, TaskService } from './task_service';
import { TaskList } from './tasklist';
import { TaskListComponent } from './tasklist.component';
import { TaskListModule } from './tasklist.module';

describe('Task List Component', () => {
  let taskListTemplate: ContainerTemplate;
  let component: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let taskList: jasmine.SpyObj<TaskList>;

  beforeEach(async(() => {
    taskService = jasmine.createSpyObj('TaskService', ['getAllTasks', 'getCaseEvents', 'getTaskEvents']);
    taskList = jasmine.createSpyObj('TaskList', ['buttonPressed']);

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
        { provide: TaskList, useValue: taskList },
      ],
    });
  }));

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
      ContainerTemplate
        .create('cell')
        .contentStyle('header_cell')
        .styles(BqPresentationStyles.ONLYICON, BqPresentationStyles.ICON_FA_PREFIX + 'play_circle')
        .properties({
          type: 'ACTION',
          identifier: 'actionButton2',
        })
        .children(
          ButtonTemplate.create('button').caption('Klik op mij'),
        ),
      TextItemTemplate.create('NoResults').plainText('Nothing to see here'),
    );

    taskService.getAllTasks.and.returnValue(of(
      [{
        containerIdentifier: 'testcontainer',
        identifier: '123abc',
        name: 'task',
        displayName: 'Taak',
        status: 'open',
        customFields: {
          customField: 'custom',
        },
      }, {
        containerIdentifier: 'container',
        identifier: '456',
        name: 'task2',
        displayName: 'Taak 2',
        status: 'started',
        customFields: {},
      }] as Task[],
    ));
    taskService.getCaseEvents.and.returnValue(EMPTY);
    taskService.getTaskEvents.and.returnValue(EMPTY);
  });

  describe('Task list', () => {
    it('should have a row with correct header content', () => {
      buildComponent();

      const headerRows = component.nativeElement.querySelectorAll('.mat-header-row');
      expect(headerRows.length).toBe(1);

      const headerCells = headerRows[0].querySelectorAll('.mat-header-cell');

      expect(headerCells.length).toBe(5);
      expect(headerCells[0].innerText.trim()).toBe('Name');
      expect(headerCells[1].innerText.trim()).toBe('Status');
      expect(headerCells[2].innerText.trim()).toBe('Custom field');

      // Although a button is modelled, it should not be visible in the header row, but in the body cells
      const buttons = headerCells[3].querySelectorAll('.mat-raised-button');
      expect(buttons.length).toBe(0);
    });

    it('should display content correctly', () => {
      buildComponent();
      const matRows = component.nativeElement.querySelectorAll('.mat-row');
      expect(matRows.length).toBe(2);

      const firstRowColumns = matRows[0].querySelectorAll('.mat-cell');
      expect(firstRowColumns.length).toBe(5);
      expect(firstRowColumns[0].innerText).toBe('Taak');
      expect(firstRowColumns[1].innerText).toBe('open');
      expect(firstRowColumns[2].innerText).toBe('custom');
      const firstRowButtons = firstRowColumns[3].querySelectorAll('.mat-button');
      expect(firstRowButtons.length).toBe(1);
      expect(firstRowButtons[0].innerText).toBe('Klik op mij');
      const firstRowIconButtons = firstRowColumns[4].querySelectorAll('.mat-icon-button');
      expect(firstRowIconButtons.length).toBe(1);
      expect(firstRowIconButtons[0].innerText).toBeFalsy();

      const secondRowColumns = matRows[1].querySelectorAll('.mat-cell');
      expect(secondRowColumns.length).toBe(5);
      expect(secondRowColumns[0].innerText).toBe('Taak 2');
      expect(secondRowColumns[1].innerText).toBe('started');
      expect(secondRowColumns[2].innerText).toBe('');
      const secondRowButtons = secondRowColumns[3].querySelectorAll('.mat-button');
      expect(secondRowButtons.length).toBe(1);
      expect(secondRowButtons[0].innerText).toBe('Klik op mij');
    });

    it('should not display rows when the list is empty', () => {
      taskService.getAllTasks.and.returnValue(EMPTY);
      buildComponent();

      const matRows = component.nativeElement.querySelectorAll('.mat-row');
      expect(matRows.length).toBe(0);
    });

    it('should pass buttonPressed calls to the taskList service', () => {
      component = BlueriqSessionTemplate.create().build(taskListTemplate).get(TaskListComponent);
      const button: Button = ButtonTemplate.create('test').caption('test').build();
      component.componentInstance.taskList = taskList;
      component.componentInstance.buttonPressed(button, 'x');
      expect(taskList.buttonPressed).toHaveBeenCalledWith(button, 'x');
    });
  });

  describe('Task list provider', () => {
    beforeEach(() => {
      taskService.getAllTasks.and.returnValue(of([] as Task[]));
      taskService.getCaseEvents.and.returnValue(EMPTY);
      taskService.getTaskEvents.and.returnValue(EMPTY);
    });

    it('should have a default pagingsize of 10', () => {
      buildComponent();
      expect(component.componentInstance.taskList.pagingSize).toEqual(10);
    });

    it('should correctly read the pagingsize property', () => {
      taskListTemplate.setProperty('pagingsize', '20');
      buildComponent();
      expect(component.componentInstance.taskList.pagingSize).toEqual(20);
    });

    it('should handle CREATED task events correctly', () => {
      buildComponent();

      const provider = component.componentInstance.taskList;
      const subject = provider.tasks$;

      expect(subject.getValue()).toEqual([]);

      const task: Task = {
        containerIdentifier: '42',
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

    it('should handle UPDATED task events correctly', () => {
      buildComponent();
      const provider = component.componentInstance.taskList;
      const subject = provider.tasks$;

      const task: Task = {
        containerIdentifier: '222',
        identifier: '111',
        name: 'task',
        status: 'open',
      } as Task;

      subject.next([task]);
      provider.handleTaskEvent({ action: 'UPDATED', taskModel: task });
      expect(subject.getValue()).toEqual([task]);

      provider.handleTaskEvent({ action: 'COMPLETED', taskModel: task });
      expect(subject.getValue()).toEqual([]);
    });

    it('should handle DELETED task events correctly', () => {
      buildComponent();
      const provider = component.componentInstance.taskList;
      const subject = provider.tasks$;

      const task: Task = {
        containerIdentifier: '333',
        identifier: '444',
        name: 'taak',
        status: 'open',
      } as Task;

      subject.next([task]);
      provider.handleTaskEvent({ action: 'DELETED', taskModel: task });
      expect(subject.getValue()).toEqual([]);
    });

    it('should handle CANCELED task events correctly', () => {
      buildComponent();
      const provider = component.componentInstance.taskList;
      const subject = provider.tasks$;

      const task: Task = {
        containerIdentifier: '333',
        identifier: '444',
        name: 'taak',
        status: 'open',
      } as Task;

      subject.next([task]);
      provider.handleTaskEvent({ action: 'CANCELED', taskModel: task });
      expect(subject.getValue()).toEqual([]);
    });

    it('should handle EXPIRED task events correctly', () => {
      buildComponent();
      const provider = component.componentInstance.taskList;
      const subject = provider.tasks$;

      const task: Task = {
        containerIdentifier: '333',
        identifier: '444',
        name: 'taak',
        status: 'open',
      } as Task;

      subject.next([task]);
      provider.handleTaskEvent({ action: 'EXPIRED', taskModel: task });
      expect(subject.getValue()).toEqual([]);
    });

    it('should handle UPDATED case events wih status LOCKED correctly', () => {
      buildComponent();
      const provider = component.componentInstance.taskList;
      const subject = provider.tasks$;

      expect(provider.isCaseLocked()).toBeFalsy();

      const task: Task = {
        containerIdentifier: '333',
        identifier: '444',
        name: 'taak',
        status: 'open',
      } as Task;

      const aCase: Case = {
        containerIdentifier: '333',
        status: 'LOCKED',
      } as Case;

      subject.next([task]);

      provider.handleCaseEvent({ action: 'UPDATED', caseModel: aCase });

      const tasks = subject.getValue();
      expect(provider.isCaseLocked()).toBeTruthy();
      expect(tasks.length).toBe(1);
      expect(tasks[0].caseLocked).toBeTruthy();
    });

    it('should handle UPDATED case events with status OPEN correctly', () => {
      buildComponent();
      const provider = component.componentInstance.taskList;
      const subject = provider.tasks$;

      expect(provider.isCaseLocked()).toBeFalsy();

      const aCase: Case = {
        containerIdentifier: '333',
        status: 'LOCKED',
      } as Case;

      provider.handleCaseEvent({ action: 'UPDATED', caseModel: aCase });
      expect(provider.isCaseLocked()).toBeTruthy();

      const task: Task = {
        containerIdentifier: '333',
        identifier: '444',
        name: 'taak',
        status: 'open',
        caseLocked: true,
      } as Task;

      aCase.status = 'OPEN';

      subject.next([task]);

      provider.handleCaseEvent({ action: 'UPDATED', caseModel: aCase });

      const tasks = subject.getValue();
      expect(provider.isCaseLocked()).toBeFalsy();
      expect(tasks.length).toBe(1);
      expect(tasks[0].caseLocked).toBeFalsy();
    });
  });

  function buildComponent() {
    component = BlueriqSessionTemplate.create().build(taskListTemplate).get(TaskListComponent);
  }
});
