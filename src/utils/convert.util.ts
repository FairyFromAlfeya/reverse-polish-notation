import {
  tokenize,
  normalize,
  Token,
  isOperation,
  OperationTokensType,
} from './';

export const LOWEST_PRIORITY = 0;

export const operatorsPriority: Record<OperationTokensType, number> = {
  BRACKET_LEFT: 1,
  BRACKET_RIGHT: 1,
  PLUS: 2,
  MINUS: 2,
  MULTIPLICATION: 3,
  DIVISION: 3,
};

export const hasMorePriority = (a: Token, b: Token): boolean =>
  (operatorsPriority[a as OperationTokensType] || LOWEST_PRIORITY) >
  (operatorsPriority[b as OperationTokensType] || LOWEST_PRIORITY);

/**
 * Converts infix notation to postfix
 *
 * @param {string} value Input string
 * @return {Token[]} Postfix notation for input string
 */
export const infixToPostfix = (value: string): Token[] => {
  // Normalize and parse input string
  const normalized: string = normalize(value);
  const tokens: Token[] = tokenize(normalized);

  // Postfix expression and stack buffer
  const postfix: Token[] = [];
  const stack: Token[] = [];

  const getStackLastOperation = (): Token => stack[stack.length - 1];

  tokens.forEach((token) => {
    // Process operation token
    if (isOperation(token)) {
      if (token === 'BRACKET_RIGHT') {
        // Push tokens from stack to result until bracket expression is not closed
        while (getStackLastOperation() != 'BRACKET_LEFT') {
          postfix.push(stack.pop());
        }

        // Remove BRACKET_LEFT from stack
        stack.pop();
      } else if (
        token === 'BRACKET_LEFT' ||
        hasMorePriority(token, getStackLastOperation())
      ) {
        // Push operation to stack if it's left bracket, or it has more priority than last
        stack.push(token);
      } else {
        // Push tokens from stack to result until current operation
        // priority is lower than last and stack is not empty
        while (
          !hasMorePriority(token, getStackLastOperation()) &&
          stack.length > 0
        ) {
          postfix.push(stack.pop());
        }

        // Push current operation to stack
        stack.push(token);
      }
    } else {
      postfix.push(token);
    }
  });

  // Flush all stack to result in the end
  while (stack.length > 0) {
    postfix.push(stack.pop());
  }

  return postfix;
};
