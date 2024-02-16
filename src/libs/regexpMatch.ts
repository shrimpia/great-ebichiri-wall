/**
 * [text] が 正規表現 [pattern] にマッチするかどうかを判定する
 * @param text
 * @param pattern
 * @returns マッチする場合は true、しない場合は false
 */

export const regexpMatch = (text: string, pattern: string) => {
  try {
    const regexp = new RegExp(pattern.slice(1, -1));
    return regexp.test(text);
  } catch (e) {
    if (e instanceof SyntaxError) {
      // 正規表現が不正な場合はマッチしないものとしてしまう
      return false;
    } else {
      throw e;
    }
  }
};
