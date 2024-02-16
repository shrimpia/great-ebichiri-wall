import { regexpMatch } from "./regexpMatch";
import { simpleMatch } from "./simpleMatch";

/**
 * Determines whether [word] is included in [text] or matches as a regular expression.
 * @param text The text to be evaluated.
 * @param word The word or regular expression pattern to check for. If enclosed in /, it is treated as a regular expression.
 * @returns True if there is a match, false otherwise.
 */
export const match = (text: string, word: string) => {
  if (word.startsWith('/') && word.endsWith('/')) {
    return regexpMatch(text, word);
  } else {
    return simpleMatch(text, word);
  }
};
