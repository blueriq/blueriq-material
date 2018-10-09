import { SharedModule } from './shared.module';

describe('SharedModule', () => {
  let sharedModule: SharedModule;

  // TODO check on all exports are available

  beforeEach(() => {
    sharedModule = new SharedModule();
  });

  it('should create an instance', () => {
    expect(sharedModule).toBeTruthy();
  });
});
