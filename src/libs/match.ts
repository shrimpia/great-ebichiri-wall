import { regexpMatch } from "./regexpMatch";
import { simpleMatch } from "./simpleMatch";

/**
 * [text] に [word] が含まれるか、あるいは正規表現としてマッチするかを判定する
 * @param text 判定するテキスト
 * @param word マッチするかどうかを判定する単語。/で囲まれている場合は正規表現として扱う
 * @returns マッチする場合は true、しない場合は false
 */
export const match = (text: string, word: string) => {
  if (word.startsWith('/') && word.endsWith('/')) {
    return regexpMatch(text, word);
  } else {
    return simpleMatch(text, word);
  }
};
