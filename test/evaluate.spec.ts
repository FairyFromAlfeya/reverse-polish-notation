import { evaluate } from '../src';

describe('Evaluate', () => {
  describe('evaluate()', () => {
    it('should return 235.2 for 234+3*4/(5+10/2)', () => {
      expect(evaluate('234+3*4/(5+10/2)')).toEqual(235.2);
    });

    it('should return 4 for 2+2', () => {
      expect(evaluate('2+2')).toEqual(4);
    });

    it('should return 25 for 3*(4+5)-6/(1+2)', () => {
      expect(evaluate('3*(4+5)-6/(1+2)')).toEqual(25);
    });

    it('should return 24 for 3*(4+4)', () => {
      expect(evaluate('3*(4+4)')).toEqual(24);
    });

    it('should return 34 for 4+5*6', () => {
      expect(evaluate('4+5*6')).toEqual(34);
    });

    it('should return 11 for 4+7-.0', () => {
      expect(evaluate('4+7-.0')).toEqual(11);
    });

    it('should return -1 for 5+6*(1-2)', () => {
      expect(evaluate('5+6*(1-2)')).toEqual(-1);
    });

    it('should return 10 for 5+6*(1-2/(7+5))', () => {
      expect(evaluate('5+6*(1-2/(7+5))')).toEqual(10);
    });
  });
});
