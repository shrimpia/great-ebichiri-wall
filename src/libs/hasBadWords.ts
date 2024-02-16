import { match } from "../libs/match";

/**
 * Determines whether [text] matches any of the [badWords].
 * @param text
 * @param badWords
 * @returns True if there is a match, false otherwise.
 */
export const hasBadWords = (text: string, badWords: string[]) => {
  // Remove delimiters used for countermeasures and then perform the evaluation.
  const normalizedText = text.replace(/[ /　／]/g, '');
  return badWords.length > 0 && badWords.some(word => match(normalizedText, word));
};
