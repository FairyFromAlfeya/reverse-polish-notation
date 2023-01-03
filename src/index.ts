import { infixToPostfix, Token, OperationTokensType } from './utils';

export type OperationAction = (a: number, b: number) => number;

export const operatorsActions: Record<OperationTokensType, OperationAction> = {
  PLUS: (a: number, b: number) => a + b,
  MINUS: (a: number, b: number) => a - b,
  MULTIPLICATION: (a: number, b: number) => a * b,
  DIVISION: (a: number, b: number) => a / b,
  BRACKET_LEFT: () => 0,
  BRACKET_RIGHT: () => 0,
};

/**
 * Executes specified math expression
 *
 * @param {string} expression Math expression
 * @return {number} Result of the expression
 */
export const evaluate = (expression: string): number => {
  const rpn: Token[] = infixToPostfix(expression);
  const stack: number[] = [];

  rpn.forEach((token: Token) => {
    if (token in operatorsActions) {
      const [b, a] = [stack.pop(), stack.pop()];
      stack.push(operatorsActions[token as OperationTokensType](a, b));
    } else {
      stack.push(token as number);
    }
  });

  return stack.pop();
};
