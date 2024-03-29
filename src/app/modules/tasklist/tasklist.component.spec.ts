import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Task, TaskCollection, TaskService } from '@blueriq/angular';
import { TaskList } from '@blueriq/angular/lists';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { Button } from '@blueriq/core';
import { ButtonTemplate, ContainerTemplate, TextItemTemplate } from '@blueriq/core/testing';
import { EMPTY, of } from 'rxjs';
import { AssetModule } from '../asset/asset.module';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { ButtonModule } from '../button/button.module';
import { ContainerModule } from '../container/container.module';
import { TextItemModule } from '../textitem/textitem.module';
import { TaskListComponent } from './tasklist.component';
import { TaskListModule } from './tasklist.module';

describe('Task List Component', () => {
  let taskListTemplate: ContainerTemplate;
  let taskListReadOnly: ContainerTemplate;
  let component: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let taskList: jasmine.SpyObj<TaskList>;

  beforeEach(async() => {
    taskService = jasmine.createSpyObj('TaskService', ['getTaskCollection', 'subscribe', 'unsubscribe']);
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
  });

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
      ContainerTemplate.create().contentStyle('no_results').children(
        TextItemTemplate.create('NoResults').plainText('Nothing to see here'),
      ),
    );

    taskListReadOnly = ContainerTemplate.create();
    taskListReadOnly.contentStyle('tasklist');
    taskListReadOnly.children(
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
        type: 'ACTION',
        identifier: 'actionButton',
      })
      .children(
        ButtonTemplate.create('button').caption('Klik op mij Disabled').disabled(),
      ),
    );
    const taskCollection: TaskCollection = {
      containerIdentifier: 'testcontainer',
      taskModels: [
        {
          identifier: '123abc',
          name: 'task',
          displayName: 'Taak',
          status: 'open',
          customFields: {
            customField: 'custom',
          },
        },
        {
          identifier: '456',
          name: 'task2',
          displayName: 'Taak 2',
          status: 'started',
          customFields: {},
        },
        {
          identifier: '456',
          name: 'task3',
          displayName: 'Taak 3',
          status: 'open',
          customFields: {},
          caseLocked: true,
        },
      ] as Task[],
    };

    taskService.getTaskCollection.and.returnValue(of(
      taskCollection));
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
      expect(matRows.length).toBe(3);

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

      const emptyText = component.nativeElement.querySelectorAll('.no-results-text');
      expect(emptyText.length).toBe(0);
    });

    it('should not display rows but empty text when the list is empty', () => {
      taskService.getTaskCollection.and.returnValue(EMPTY);
      buildComponent();

      const matRows = component.nativeElement.querySelectorAll('.mat-row');
      expect(matRows.length).toBe(0);

      const emptyText = component.nativeElement.querySelectorAll('.no-results-text');
      expect(emptyText.length).toBe(1);
      expect(emptyText.item(0).textContent.trim()).toBe('Nothing to see here');
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
      taskService.getTaskCollection.and.returnValue(of({} as TaskCollection));
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
  });

  describe('TaskList buttons disabled', () => {

    it('should render all buttons disabled when tasklist isreadonly', () => {
      const componentRO = BlueriqSessionTemplate.create().build(taskListReadOnly).get(TaskListComponent);
      const matRowsReadOnly = componentRO.nativeElement.querySelectorAll('.mat-row');
      const firstRowColumnsRO = matRowsReadOnly[0].querySelectorAll('.mat-cell');
      const secondRowColumnsRO = matRowsReadOnly[1].querySelectorAll('.mat-cell');
      const thirdRowColumnsRO = matRowsReadOnly[2].querySelectorAll('.mat-cell');

      expect(firstRowColumnsRO.length).toBe(3);
      expect(firstRowColumnsRO[0].innerText).toBe('Taak');
      expect(firstRowColumnsRO[1].innerText).toBe('open');
      expect(firstRowColumnsRO[2].innerText).toBe('Klik op mij Disabled');
      expect(firstRowColumnsRO[2].children[0].disabled).toBeTruthy();

      expect(secondRowColumnsRO.length).toBe(3);
      expect(secondRowColumnsRO[0].innerText).toBe('Taak 2');
      expect(secondRowColumnsRO[1].innerText).toBe('started');
      expect(secondRowColumnsRO[2].innerText).toBe('Klik op mij Disabled');
      expect(secondRowColumnsRO[2].children[0].disabled).toBeTruthy();

      expect(thirdRowColumnsRO.length).toBe(3);
      expect(thirdRowColumnsRO[0].innerText).toBe('Taak 3');
      expect(thirdRowColumnsRO[1].innerText).toBe('open');
      expect(thirdRowColumnsRO[2].innerText).toBe('Klik op mij Disabled');
      expect(thirdRowColumnsRO[2].children[0].disabled).toBeTruthy();
    });

    it('should render some buttons disabled when tasklist is NOT readonly', () => {
      component = BlueriqSessionTemplate.create().build(taskListTemplate).get(TaskListComponent);
      const matRows = component.nativeElement.querySelectorAll('.mat-row');
      const firstRowColumns = matRows[0].querySelectorAll('.mat-cell');
      const secondRowColumns = matRows[1].querySelectorAll('.mat-cell');
      const thirdRowColumns = matRows[2].querySelectorAll('.mat-cell');

      expect(firstRowColumns.length).toBe(5);
      expect(firstRowColumns[0].innerText).toBe('Taak');
      expect(firstRowColumns[1].innerText).toBe('open');
      expect(firstRowColumns[3].innerText).toBe('Klik op mij');
      expect(firstRowColumns[3].children[0].disabled).toBeFalsy();

      expect(secondRowColumns.length).toBe(5);
      expect(secondRowColumns[0].innerText).toBe('Taak 2');
      expect(secondRowColumns[1].innerText).toBe('started');
      expect(secondRowColumns[3].innerText).toBe('Klik op mij');
      expect(secondRowColumns[3].children[0].disabled).toBeTruthy();

      expect(thirdRowColumns.length).toBe(5);
      expect(thirdRowColumns[0].innerText).toBe('Taak 3');
      expect(thirdRowColumns[1].innerText).toBe('open');
      expect(thirdRowColumns[3].innerText).toBe('Klik op mij');
      expect(thirdRowColumns[3].children[0].disabled).toBeTruthy();
    });
  });

  function buildComponent() {
    component = BlueriqSessionTemplate.create().build(taskListTemplate).get(TaskListComponent);
  }
});
