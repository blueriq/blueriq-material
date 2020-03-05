import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class TaskListFlow {
  private shortcut = '/shortcut/tasklist';

  private PAGE_LOGIN_TAGNAME = 'bq-login';
  private PAGE_LOGIN_FIELDNAME_USERNAME = 'username';
  private PAGE_LOGIN_FIELDNAME_PASSWORD = 'password';
  private PAGE_LOGIN_BUTTON = 'loginbutton';
  private PAGE_PROJECT_TAGNAME = 'bq-project';
  private PAGE_TASKLIST_TAGNAME = 'bq-tasklist';

  private TAB_DASHBOARD = 0;
  private TAB_TASKLIST_ONE = 1;
  private TAB_TASKLIST_TWO = 2;

  start() {
    return browser.get(this.shortcut);
  }

  reset() {
    return browser.restart();
  }

  login(username: string, password: string): void {
    this.usernameInput.sendKeys(username);
    this.passwordInput.sendKeys(password);
    this.buttonLogin.click();
    browser.waitForAngular();
  }

  switchToDashboardTab(): void {
    this.switchTab(this.TAB_DASHBOARD);
  }

  switchToTaskListOneTab(): void {
    this.switchTab(this.TAB_TASKLIST_ONE);
  }

  switchToTaskListTwoTab(): void {
    this.switchTab(this.TAB_TASKLIST_TWO);
  }

  startIntake(): void {
    const aanvraagMenu = this.projectPage.all(by.className('mat-menu-item')).last();
    aanvraagMenu.click();
    browser.waitForAngular();
    // firefox needs some time for the new tab to load
    browser.sleep(500);
  }

  startCase(): void {
    // fill in aanvraaggegevens
    this.projectPage.element(by.tagName('input')).sendKeys('automated');
    this.projectPage.element(by.id('P572_Ok_1')).click();
    browser.waitForAngular();
  }

  openSameCaseInNewTab() {
    // click Home button to refresh the dashboard page to display the case that was just added
    this.projectPage.all(by.tagName('bq-menu-item')).first().element(by.tagName('button')).click();
    browser.waitForAngular();
    // open the record in the top row (sorted by id desc by default, so this is the last one added)
    this.projectPage.all(by.css('.mat-row')).first().element(by.tagName('button')).click();
    browser.waitForAngular();
    // firefox needs some time for the new tab to load
    browser.sleep(500);
  }

  /**
   * searches the task based on display name and starts it by clicking the button in the same row.
   * Assumes there is only one button per task row.
   * @param taskDisplayName the display name of the task
   */
  startTask(taskDisplayName: string): void {
    const task = this.taskListRows.filter(row => row.element(by.className('mat-column-displayname')).getText()
    .then(text => text === taskDisplayName)).first();
    const taskStartButton = task.element(by.tagName('button'));
    expect(taskStartButton.isEnabled).toBeTruthy();
    taskStartButton.click();
    browser.waitForAngular();
  }

  executeTaskToevoegenBewijsstukken(): void {
    expect(this.projectPage.element(by.tagName('bq-file-upload'))).toBeTruthy();
    this.projectPage.element(by.id('P463_Ok_1')).click();
    browser.waitForAngular();
  }

  ///////////////////////////////// Verify functions

  verifyOnDashboardPage(): void {
    return this.verifyOnPage('Mijn zaken');
  }

  verifyOnIntakePage(): void {
    return this.verifyOnPage('Intake');
  }

  verifyOnTaskListPage(): void {
    this.verifyOnPage('Zaakgegevens');
  }

  verifyOnTaskExecutePage(): void {
    return this.verifyOnPage('Mijn Taak');
  }

  private verifyOnPage(mainTitle: string): void {
    expect(this.projectPage.isPresent()).toBeTruthy();
    expect(this.mainHeader.getText()).toEqual(mainTitle, `should be on page ${mainTitle}`);
  }

  verifyNumberOfTasks(count: number): void {
    expect(this.taskListRows.count()).toBe(count, `expect # tasks to be ${count}`);
  }

  verifyTaskButtonsAreDisabled(): void {
    this.taskListRows.each(row => expect(row!.element(by.tagName('button')).isEnabled()).toBeFalsy('task buttons should be disabled'));
  }

  verifyTaskButtonsAreEnabled(): void {
    this.taskListRows.each(row => expect(row!.element(by.tagName('button')).isEnabled()).toBeTruthy('task buttons should be enabled'));
  }

  ///////////////////////////////// Utility functions

  private get loginPage(): ElementFinder {
    return element(by.tagName(this.PAGE_LOGIN_TAGNAME));
  }

  private get usernameInput(): ElementFinder {
    return this.loginPage.element(by.name(this.PAGE_LOGIN_FIELDNAME_USERNAME));
  }

  private get passwordInput(): ElementFinder {
    return this.loginPage.element(by.name(this.PAGE_LOGIN_FIELDNAME_PASSWORD));
  }

  private get buttonLogin(): ElementFinder {
    return this.loginPage.element(by.id(this.PAGE_LOGIN_BUTTON));
  }

  private get projectPage(): ElementFinder {
    return element(by.tagName(this.PAGE_PROJECT_TAGNAME));
  }

  private get mainHeader(): ElementFinder {
    return this.projectPage.element(by.tagName('h2'));
  }

  private get taskList(): ElementFinder {
    return this.projectPage.element(by.tagName(this.PAGE_TASKLIST_TAGNAME));
  }

  private get taskListRows(): ElementArrayFinder {
    return this.taskList.all(by.css('.mat-row'));
  }

  private switchTab(tabId: number) {
    browser.getAllWindowHandles().then((handles) => {
      browser.driver.switchTo().window(handles[tabId]);
    });
  }
}
