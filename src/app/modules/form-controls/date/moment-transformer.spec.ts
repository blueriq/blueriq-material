import moment from 'moment';
import { MomentTransformer } from './moment-transformer';

describe('MomentTransfer', () => {
  const transformer = new MomentTransformer();
  const now = new Date();

  it('test MomentTransfer methods', () => {
    expect(transformer.toControl(null)).withContext('null is not transformed to control').toBeNull();
    expect(transformer.toField(null)).withContext('null is not transformed to field').toBeNull();
    expect(transformer.toControl(now)).withContext('date is transformed moment').toEqual(moment(now));
    expect(transformer.toField(moment(now))).withContext('moment is transformed to date').toEqual(now);
  });
});
