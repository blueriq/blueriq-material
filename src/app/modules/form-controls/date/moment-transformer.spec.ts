import moment from 'moment/min/moment-with-locales';
import { MomentTransformer } from './moment-transformer';

describe('MomentTransfer', () => {
  const transformer = new MomentTransformer();
  const now = new Date();

  it('test MomentTransfer methods', () => {
    expect(transformer.toControl(null), 'null is not transformed to control').toBeNull();
    expect(transformer.toField(null), 'null is not transformed to field').toBeNull();
    expect(transformer.toControl(now), 'date is transformed moment').toEqual(moment(now));
    expect(transformer.toField(moment(now)), 'moment is transformed to date').toEqual(now);
  });
});
