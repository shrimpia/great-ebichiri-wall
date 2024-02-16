/**
 * 単純な文字列の部分一致を判定する
 * @param text
 * @param word
 * @returns マッチする場合は true、しない場合は false
 */
export const simpleMatch = (text: string, word: string) => {
  return text.includes(word);
};
