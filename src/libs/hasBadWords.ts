import { match } from "../libs/match";

/**
 * [text] が [badWords] のいずれかにマッチするかどうかを判定する
 * @param text
 * @param badWords
 * @returns マッチする場合は true、しない場合は false
 */
export const hasBadWords = (text: string, badWords: string[]) => {
  // 対策用の区切り文字などを削除して判定する
  const normalizedText = text.replace(/[ /　／]/g, '');
  return badWords.length > 0 && badWords.some(word => match(normalizedText, word));
};
