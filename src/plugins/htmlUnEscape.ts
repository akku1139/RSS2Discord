import { makePlugin } from "../utils.ts"
import { unescape } from "@std/html/entities"
import entityList from "@std/html/named-entity-list.json" with { type: "json" }

// 後で書く
// 数値文字参照と文字実体参照
// replaceAll
// 文字列のやつはめっちゃ多い、変換テーブル式が楽
// https://www.cis.twcu.ac.jp/~asakawa/comp2d-2008/special_chars.html
// 基本的に使われないやつの変換入れても重くなるだけ
// unicode形式は頑張る
export const unEscapeHTML = makePlugin({
  transformer: {
    description(s) {
      return unescape(s, { entityList })
    }
  }
})
