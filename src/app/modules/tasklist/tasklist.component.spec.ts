import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Session } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { BlueriqTestSession } from '@blueriq/angular/testing/src/test_session';
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
  let session: BlueriqTestSession;
  let component: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
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
        { provide: TaskService, useClass: MockV2TaskService },
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
          identifier: 'name',
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
          ButtonTemplate.create('button').caption('Klik op mij'),
        ),
      );

      session = BlueriqSessionTemplate.create().build(taskListTemplate);
      component = session.get(TaskListComponent);
    });

    it('should have a row with correct header content', () => {
      const headerRows = component.nativeElement.querySelectorAll('.mat-header-row');
      expect(headerRows.length).toBe(1);

      const headerCells = headerRows[0].querySelectorAll('.mat-header-cell');

      expect(headerCells.length).toBe(3);
      expect(headerCells[0].innerText).toBe('Name');
      expect(headerCells[1].innerText).toBe('Status');

      // Although a button is modelled, it should not be visible in the header row, but in the body cells
      const buttons = headerCells[2].querySelectorAll('.mat-raised-button');
      expect(buttons.length).toBe(0);
    });

    it('should display content correctly', () => {
      const matRows = component.nativeElement.querySelectorAll('.mat-row');
      expect(matRows.length).toBe(2);

      const firstRowColumns = matRows[0].querySelectorAll('.mat-cell');
      expect(firstRowColumns.length).toBe(3);
      expect(firstRowColumns[0].innerText).toBe('Taak');
      expect(firstRowColumns[1].innerText).toBe('open');
      const firstRowButtons = firstRowColumns[2].querySelectorAll('.mat-raised-button');
      expect(firstRowButtons.length).toBe(1);
      expect(firstRowButtons[0].innerText).toBe('Klik op mij');

      const secondRowColumns = matRows[1].querySelectorAll('.mat-cell');
      expect(secondRowColumns.length).toBe(3);
      expect(secondRowColumns[0].innerText).toBe('Taak 2');
      expect(secondRowColumns[1].innerText).toBe('started');
      const secondRowButtons = secondRowColumns[2].querySelectorAll('.mat-raised-button');
      expect(secondRowButtons.length).toBe(1);
      expect(secondRowButtons[0].innerText).toBe('Klik op mij');
    });
  });
});

class MockV2TaskService implements TaskService {
  getAllTasks(session: Session, containerUuid: string): Observable<Task[]> {
    return Observable.of(
      [{
        caseIdentifier: 'testcase', // haha
        identifier: '123abc',
        name: 'Taak',
        status: 'open',
      }, {
        caseIdentifier: 'kees',
        identifier: '456',
        name: 'Taak 2',
        status: 'started',
      }] as Task[],
    );
  }

  getTaskEvents(containerUuid: string): Observable<TaskEvent> {
    return new EmptyObservable<TaskEvent>();
  }
}
