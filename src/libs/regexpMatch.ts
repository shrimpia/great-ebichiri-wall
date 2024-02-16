/**
 * Determines whether [text] matches the regular expression [pattern].
 * @param text
 * @param pattern
 * @returns True if there is a match, false otherwise.
 */

export const regexpMatch = (text: string, pattern: string) => {
  try {
    const regexp = new RegExp(pattern.slice(1, -1));
    return regexp.test(text);
  } catch (e) {
    if (e instanceof SyntaxError) {
      // If the regular expression is invalid, it will be treated as a non-match.
      return false;
    } else {
      throw e;
    }
  }
};
