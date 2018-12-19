import { RoutesApp } from './routes.app';

describe('Blueriq ProjectComponent Routes', () => {
  const startDefaultShortcutPath = '/';
  const startFlowPath = '/flow/export-Kinderbijslag/Start';
  const startFlowVersionPath = '/flow/export-Kinderbijslag/Start/0.0-Trunk';
  const startFlowVersionLanguagePath = '/flow/export-Kinderbijslag/Start/0.0-Trunk/en-GB';
  const startShortcutPath = '/shortcut/kinderbijslag';

  const app: RoutesApp = new RoutesApp();

  beforeEach(async() => {
    await app.reset(); // in beforeEach because taking screenshot for failing tests fails when placed in the afterEach
  });

  it('should start flow Kinderbijslag.Start', async() => {
    await app.start(startFlowPath);

    // Verify
    expect(app.pageTitleAanvragenKinderbijslag).toBe('Aanvragen kinderbijslag');
  });

  it('should start flow Kinderbijslag.Start with version', async() => {
    await app.start(startFlowVersionPath);

    // Verify
    expect(app.pageTitleAanvragenKinderbijslag).toBe('Aanvragen kinderbijslag');
  });

  it('should start flow Kinderbijslag.Start with version and language', async() => {
    await app.start(startFlowVersionLanguagePath);

    // Verify
    expect(app.pageTitleAanvragenKinderbijslag).toBe(''); // because there is no title defined in this language
  });

  it('should start Kinderbijslag shortcut', async() => {
    await app.start(startShortcutPath);

    // Verify
    expect(app.pageTitleAanvragenKinderbijslag).toBe('Aanvragen kinderbijslag');
  });

  it('should start default shortcut', async() => {
    await app.start(startDefaultShortcutPath);

    // Verify
    expect(app.pageTitleDefaultShortcutFlow).toBe('Start');
  });

  it('should start app for sessionId', async() => {
    await app.start(startDefaultShortcutPath);

    // Route to the just create BlueriqSession
    await app.start('/sessionId/' + app.retrieveSessionId('blueriq-session-default-Main'));

    // Verify
    expect(app.pageTitleDefaultShortcutFlow).toBe('Start');
  });

});
