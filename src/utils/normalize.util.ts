/**
 * Removes all whitespaces from string
 *
 * @param {string} value Input string
 * @return {string} Normalized string without spaces
 */
export const normalize = (value: string): string => {
  return value.replace(/\s+/gm, '');
};
