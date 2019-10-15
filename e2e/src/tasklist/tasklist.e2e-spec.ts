import { browser } from 'protractor';
import { TaskListFlow } from './tasklist.flow';

describe('TaskList App', () => {

  let app: TaskListFlow = new TaskListFlow();

  describe('task list', () => {
    beforeEach(async() => {
      await app.reset();
      await app.start();
    });

    it('should handle task and case events', () => {
      // login with Aanvrager role
      app.login('Aanvrager', 'Aanvrager');

      // State: logged in
      app.verifyOnDashboardPage();

      // start intake
      app.startIntake();

      // current page is still the dashboard, intake page opened on new tab
      app.verifyOnDashboardPage();

      // switch to first task list tab
      app.switchToTaskListOneTab();
      app.verifyOnIntakePage();

      // start case
      app.startCase();
      app.verifyOnTaskListPage();

      // switch to dashboard tab
      app.switchToDashboardTab();
      app.verifyOnDashboardPage();
      app.openSameCaseInNewTab();

      // now 3 tabs are opened: the dashboard and two tabs with the same case

      // switch to the first tab with a task list
      app.switchToTaskListOneTab();
      app.verifyOnTaskListPage();

      // task list should contain 2 tasks
      app.verifyNumberOfTasks(2);

      // start task 'Toevoegen bewijsstukken'
      app.startTask('Toevoegen bewijsstukken');

      // verify that other task list buttons are now disabled
      app.switchToTaskListTwoTab();
      app.verifyOnTaskListPage();
      // when the task is started, an event is sent back to the frontend that the case is locked, which is what
      // we verify in the next step. However, since the test is very fast, we need it to wait a little to make
      // sure that the event can be received by the frontend in time
      browser.sleep(500);

      app.verifyNumberOfTasks(2);
      app.verifyTaskButtonsAreDisabled();

      // switch back to first tab to execute task
      app.switchToTaskListOneTab();
      // Execute task
      app.verifyOnTaskExecutePage();
      // check that task == Toevoegen bewijsstukken
      app.executeTaskToevoegenBewijsstukken();

      // back to case overview with task list again
      app.verifyOnTaskListPage();

      // verify that other task list buttons are enabled again
      app.switchToTaskListTwoTab();
      app.verifyOnTaskListPage();

      // as described above, make sure that events can be received
      browser.sleep(500);

      // a new task Toevoegen bewijsstukken is added, all tasks should be enabled again
      app.verifyNumberOfTasks(2);
      app.verifyTaskButtonsAreEnabled();
    });

    it('should display the correct number of tasks after executing a repeatable task', () => {
      // login with Aanvrager role
      app.login('Aanvrager', 'Aanvrager');

      // State: logged in
      app.verifyOnDashboardPage();

      // start intake
      app.startIntake();

      // current page is still the dashboard, intake page opened on new tab
      app.verifyOnDashboardPage();

      // switch to first task list tab
      app.switchToTaskListOneTab();
      app.verifyOnIntakePage();

      // start case
      app.startCase();
      app.verifyOnTaskListPage();

      // task list should contain 2 tasks
      app.verifyNumberOfTasks(2);

      // start task 'Toevoegen bewijsstukken'
      app.startTask('Toevoegen bewijsstukken');

      // check that task == Toevoegen bewijsstukken
      app.executeTaskToevoegenBewijsstukken();

      // back to case overview with task list again
      app.verifyOnTaskListPage();

      // as described above, make sure that events can be received
      browser.sleep(500);

      // a new task Toevoegen bewijsstukken is added, all tasks should be enabled again
      app.verifyNumberOfTasks(2);
      app.verifyTaskButtonsAreEnabled();
    });
  });
});
