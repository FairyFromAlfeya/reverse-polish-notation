import { tokenize } from '../src/utils';

describe('Tokenize Utility', () => {
  describe('tokenize()', () => {
    it('should return 3 tokens for 2+2 expression', () => {
      expect(tokenize('2+2')).toStrictEqual([2, 'PLUS', 2]);
    });

    it('should return 7 tokens for (2.2+2.1)*2 expression', () => {
      expect(tokenize('(2.2+2.1)*2')).toStrictEqual([
        'BRACKET_LEFT',
        2.2,
        'PLUS',
        2.1,
        'BRACKET_RIGHT',
        'MULTIPLICATION',
        2,
      ]);
    });

    it('should throw "Invalid input" for 2+A', () => {
      expect(() => tokenize('2+A')).toThrow(
        'Invalid input: received - A instead of number',
      );
    });

    it('should return 3 tokens for .2+2 expression', () => {
      expect(tokenize('.2+2')).toStrictEqual([0.2, 'PLUS', 2]);
    });

    it('should throw "Invalid input" for 2.+2', () => {
      expect(() => tokenize('2.+2')).toThrow(
        'Invalid input: received - . instead of number',
      );
    });
  });
});
