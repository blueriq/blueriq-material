import { browser } from 'protractor';
import { DcmFlow } from './dcm.flow';

describe('DCM App', () => {

  let app: DcmFlow = new DcmFlow();

  describe('default', () => {
    beforeEach(async() => {
      await app.reset();
      await app.start();
    });

    it('should not login and display an error when no credentials are set', () => {
      expect(app.loginPageErrors.isPresent()).toBeFalsy();
      app.buttonLogin.click();
      browser.waitForAngular();
      expect(app.loginPage.isPresent()).toBeTruthy();
      expect(app.loginPageErrors.getAttribute('innerHTML')).toBe('Authentication failed');
    });

    executeSharedTests();
  });

  describe('by shortcut', () => {
    beforeEach(async() => {
      await app.reset();
      await app.startByShortcut();
    });

    executeSharedTests();
  });

  /* These tests are both executed for routes via flow and shortcut */
  function executeSharedTests() {
    it('should first render the login page with the corresponding elements', () => {
      expect(app.loginPage.isPresent()).toBeTruthy();
      expect(app.usernameInput.getAttribute('value')).toBe('');
      expect(app.passwordInput.getAttribute('value')).toBe('');
      expect(app.buttonLogin.isPresent()).toBeTruthy();
    });

    it('should be able to login with the correct credentials and able to logout again', () => {
      app.usernameInput.sendKeys('Aanvrager');
      app.passwordInput.sendKeys('Aanvrager');
      app.buttonLogin.click();
      browser.waitForAngular();
      expect(app.loginPage.isPresent()).toBeFalsy(
        'The loginpage is not expected anymore after entering the correct credentials');

      // State: logged in
      expect(app.projectPage.isPresent()).toBeTruthy();
      app.buttonLogout.click();
      browser.waitForAngular();

      // State: logged out
      expect(app.loginPage.isPresent()).toBeTruthy();
    });
  }

});
