import moment = require('moment');
import { MomentTransformer } from './moment-transformer';

describe('MomentTransfer', () => {
  const transformer = new MomentTransformer();
  const now = new Date();

  it('test MomentTransfer methods', () => {
    expect(transformer.toControl(null)).toBeNull('null is not transformed to control');
    expect(transformer.toField(null)).toBeNull('null is not transformed to field');
    expect(transformer.toControl(now)).toEqual(moment(now), 'date is transformed moment');
    expect(transformer.toField(moment(now))).toEqual(now, 'moment is transformed to date');
  });
});
