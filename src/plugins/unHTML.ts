import { makePlugin } from "../utils.ts";

// https://hodade.com/seiki/page.php?r_tag_sakujo
// TODO:
// - brとかをいい感じに処理
// - 最初のimgタグから自動サムネ検出?
export const unHTML = makePlugin({
  transformer: {
    description: (desc) => {
      return desc.replaceAll(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
    }
  },
  deps: {
    post: ["unEscapeHTML"]
  }
})
