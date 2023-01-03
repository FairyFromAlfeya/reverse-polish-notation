import { hasMorePriority, infixToPostfix } from '../src/utils';

describe('Convert Utility', () => {
  describe('hasMorePriority()', () => {
    describe('2 number tokens', () => {
      it('should return false for 2 and 3', () => {
        expect(hasMorePriority(2, 3)).toBeFalsy();
      });

      it('should return false for 3 and 2', () => {
        expect(hasMorePriority(3, 2)).toBeFalsy();
      });
    });

    describe('operator and number tokens', () => {
      it('should return true for PLUS and 3', () => {
        expect(hasMorePriority('PLUS', 3)).toBeTruthy();
      });

      it('should return false for 3 and PLUS', () => {
        expect(hasMorePriority(3, 'PLUS')).toBeFalsy();
      });

      it('should return true for MINUS and 3', () => {
        expect(hasMorePriority('MINUS', 3)).toBeTruthy();
      });

      it('should return false for 3 and MINUS', () => {
        expect(hasMorePriority(3, 'MINUS')).toBeFalsy();
      });

      it('should return true for MULTIPLICATION and 3', () => {
        expect(hasMorePriority('MULTIPLICATION', 3)).toBeTruthy();
      });

      it('should return false for 3 and MULTIPLICATION', () => {
        expect(hasMorePriority(3, 'MULTIPLICATION')).toBeFalsy();
      });

      it('should return true for DIVISION and 3', () => {
        expect(hasMorePriority('DIVISION', 3)).toBeTruthy();
      });

      it('should return false for 3 and DIVISION', () => {
        expect(hasMorePriority(3, 'DIVISION')).toBeFalsy();
      });

      it('should return true for BRACKET_LEFT and 3', () => {
        expect(hasMorePriority('BRACKET_LEFT', 3)).toBeTruthy();
      });

      it('should return false for 3 and BRACKET_LEFT', () => {
        expect(hasMorePriority(3, 'BRACKET_LEFT')).toBeFalsy();
      });

      it('should return true for BRACKET_RIGHT and 3', () => {
        expect(hasMorePriority('BRACKET_RIGHT', 3)).toBeTruthy();
      });

      it('should return false for 3 and BRACKET_RIGHT', () => {
        expect(hasMorePriority(3, 'BRACKET_RIGHT')).toBeFalsy();
      });
    });

    describe('PLUS/MINUS and operator tokens', () => {
      it('should return false for PLUS and MINUS', () => {
        expect(hasMorePriority('PLUS', 'MINUS')).toBeFalsy();
      });

      it('should return false for MINUS and PLUS', () => {
        expect(hasMorePriority('MINUS', 'PLUS')).toBeFalsy();
      });

      it('should return false for MINUS and DIVISION', () => {
        expect(hasMorePriority('MINUS', 'DIVISION')).toBeFalsy();
      });

      it('should return true for DIVISION and MINUS', () => {
        expect(hasMorePriority('DIVISION', 'MINUS')).toBeTruthy();
      });

      it('should return true for MINUS and BRACKET_LEFT', () => {
        expect(hasMorePriority('MINUS', 'BRACKET_LEFT')).toBeTruthy();
      });

      it('should return false for BRACKET_LEFT and MINUS', () => {
        expect(hasMorePriority('BRACKET_LEFT', 'MINUS')).toBeFalsy();
      });
    });

    describe('MULTIPLICATION/DIVISION and operator tokens', () => {
      it('should return false for MULTIPLICATION and DIVISION', () => {
        expect(hasMorePriority('MULTIPLICATION', 'DIVISION')).toBeFalsy();
      });

      it('should return false for DIVISION and MULTIPLICATION', () => {
        expect(hasMorePriority('DIVISION', 'MULTIPLICATION')).toBeFalsy();
      });

      it('should return true for DIVISION and BRACKET_LEFT', () => {
        expect(hasMorePriority('DIVISION', 'BRACKET_LEFT')).toBeTruthy();
      });

      it('should return false for BRACKET_LEFT and DIVISION', () => {
        expect(hasMorePriority('BRACKET_LEFT', 'DIVISION')).toBeFalsy();
      });
    });

    describe('BRACKET_LEFT/BRACKET_RIGHT and operator tokens', () => {
      it('should return false for BRACKET_LEFT and BRACKET_RIGHT', () => {
        expect(hasMorePriority('BRACKET_LEFT', 'BRACKET_RIGHT')).toBeFalsy();
      });

      it('should return false for BRACKET_RIGHT and BRACKET_LEFT', () => {
        expect(hasMorePriority('BRACKET_RIGHT', 'BRACKET_LEFT')).toBeFalsy();
      });
    });
  });

  describe('infixToPostfix()', () => {
    it('should return 561275+/-*+ for 5+6*(1-2/(7+5))', () => {
      expect(infixToPostfix('5+6*(1-2/(7+5))')).toStrictEqual([
        5,
        6,
        1,
        2,
        7,
        5,
        'PLUS',
        'DIVISION',
        'MINUS',
        'MULTIPLICATION',
        'PLUS',
      ]);
    });

    it('should return 5612-*+ for 5+6*(1-2)', () => {
      expect(infixToPostfix('5+6*(1-2)')).toStrictEqual([
        5,
        6,
        1,
        2,
        'MINUS',
        'MULTIPLICATION',
        'PLUS',
      ]);
    });

    it('should return 47+0- for 4+7-.0', () => {
      expect(infixToPostfix('4+7-.0')).toStrictEqual([
        4,
        7,
        'PLUS',
        0,
        'MINUS',
      ]);
    });

    it('should return 456*+ for 4+5*6', () => {
      expect(infixToPostfix('4+5*6')).toStrictEqual([
        4,
        5,
        6,
        'MULTIPLICATION',
        'PLUS',
      ]);
    });

    it('should return 344+* for 3*(4+4)', () => {
      expect(infixToPostfix('3*(4+4)')).toStrictEqual([
        3,
        4,
        4,
        'PLUS',
        'MULTIPLICATION',
      ]);
    });

    it('should return 345+*612+/- for 3*(4+5)-6/(1+2)', () => {
      expect(infixToPostfix('3*(4+5)-6/(1+2)')).toStrictEqual([
        3,
        4,
        5,
        'PLUS',
        'MULTIPLICATION',
        6,
        1,
        2,
        'PLUS',
        'DIVISION',
        'MINUS',
      ]);
    });
  });
});
