import { normalize } from '../src/utils';

describe('Normalize Utility', () => {
  describe('normalize()', () => {
    it('should return trimmed string without whitespaces', () => {
      expect(normalize(' 234+ 43   ')).toEqual('234+43');
    });

    it('should return trimmed string without tabs', () => {
      expect(normalize('\t234\t+43\t')).toEqual('234+43');
    });

    it('should return trimmed string without tabs and whitespaces', () => {
      expect(normalize('  \t 234 + 43  \t\t  ')).toEqual('234+43');
    });

    it('should return trimmed string without new lines', () => {
      expect(normalize('  234 \n  +43   ')).toEqual('234+43');
    });

    it('should return trimmed string without tabs, new lines and whitespaces', () => {
      expect(normalize('\n\n 234\t\t\n \t+43 \n\t\t ')).toEqual('234+43');
    });

    it('should return empty string', () => {
      expect(normalize('\t\t\n\t\n\n   \n')).toEqual('');
    });
  });
});
