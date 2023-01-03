export const SIGNS = ['+', '-', '*', '/', '(', ')'] as const;

export const OPERATION_TOKENS = [
  'PLUS',
  'MINUS',
  'MULTIPLICATION',
  'DIVISION',
  'BRACKET_LEFT',
  'BRACKET_RIGHT',
] as const;

export type SignsType = typeof SIGNS[number];

export type OperationTokensType = typeof OPERATION_TOKENS[number];

export type NumberToken = number;

export type Token = OperationTokensType | NumberToken;

export const signToToken: Record<SignsType, OperationTokensType> = {
  '+': 'PLUS',
  '-': 'MINUS',
  '*': 'MULTIPLICATION',
  '/': 'DIVISION',
  '(': 'BRACKET_LEFT',
  ')': 'BRACKET_RIGHT',
};

export const isSign = (sign: string): boolean =>
  SIGNS.includes(sign as SignsType);

export const isOperation = (operation: Token): boolean =>
  OPERATION_TOKENS.includes(operation as OperationTokensType);

export const NumberRegExp = /(\d*\.)?\d+/;

/**
 * Splits input string on tokens recursively
 *
 * @param {string} value Normalized input string
 * @param {Token[]} buffer Accumulator for parsed tokens to return in the end
 * @return {Token[]} Tokenized input string
 */
export const tokenize = (value: string, buffer: Token[] = []): Token[] => {
  // Return result if input string is empty
  if (value.length === 0) {
    return buffer;
  }

  // Try to interpret the first char as a math sign
  const firstChar = value.charAt(0);

  // Parse operation token if the first char is a sign
  if (isSign(firstChar)) {
    // Save operation to buffer and call recursion
    buffer.push(signToToken[firstChar as SignsType]);
    return tokenize(value.slice(1), buffer);
  } else {
    const numberTokenStartIndex: number = value.search(NumberRegExp);

    // Throw an error if the number token wasn't found or doesn't start from 0 index
    if (numberTokenStartIndex !== 0) {
      throw Error(`Invalid input: received - ${firstChar} instead of number`);
    }

    // Save number to buffer and call recursion
    const numberLiteral: string = value.match(NumberRegExp)[0];
    buffer.push(+numberLiteral);
    return tokenize(value.slice(numberLiteral.length), buffer);
  }
};
