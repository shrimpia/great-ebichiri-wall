/**
 * Determines partial matching of a simple string.
 * @param text
 * @param word
 * @returns True if there is a match, false otherwise.
 */
export const simpleMatch = (text: string, word: string) => {
  return text.includes(word);
};
