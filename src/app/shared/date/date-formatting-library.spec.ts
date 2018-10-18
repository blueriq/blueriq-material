import { MomentDateFormatting } from './date-formatting-library';

describe('MomentDateFormatting', () => {

  const dateFormatting = new MomentDateFormatting();

  describe('parse', () => {

    it('should parse valid dates', () => {
      const date = dateFormatting.parse('18-10-2018', 'DD-MM-YYYY', 'nl-NL')!;

      expect(date).not.toBeNull();
      expect(date.getFullYear()).toEqual(2018);
      expect(date.getDate()).toEqual(18);
      expect(date.getMonth()).toEqual(10 - 1);
    });

    it('should handle invalid dates', () => {
      const date = dateFormatting.parse('34-16-2000', 'DD-MM-YYYY', 'nl-NL');

      expect(date).toBeNull();
    });

  });

  describe('format', () => {

    it('formats according to the date format', () => {
      const date = new Date(2018, 10 - 1, 18, 12, 34, 56);

      expect(dateFormatting.format(date, 'DD-MM-YYYY HH:mm:ss', 'nl-NL')).toEqual('18-10-2018 12:34:56');
    });

  });

});
