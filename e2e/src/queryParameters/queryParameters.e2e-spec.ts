import { QueryParametersFlow } from './queryParameters.flow';

describe('QueryParameters app', () => {

  let app: QueryParametersFlow = new QueryParametersFlow();

  beforeEach(async() => {
    await app.reset(); // in beforeEach because taking screenshot for failing tests fails when placed in the afterEach
    await app.start();
  });

  it('should display the correct query parameter value', () => {
    expect(app.getTestParameterValue()).toBe('Blueriq');
  });
});
