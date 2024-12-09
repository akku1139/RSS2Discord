import { makePlugin } from "../utils.ts";

export const unHTMLCore = (i: string) => i.replaceAll(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")

// https://hodade.com/seiki/page.php?r_tag_sakujo
// TODO:
// - brとかをいい感じに処理
// - 最初のimgタグから自動サムネ検出?
export const unHTML = makePlugin({
  transformer: {
    description: (desc) => {
      return unHTMLCore(desc)
    }
  },
  deps: {
    post: ["unEscapeHTML"]
  }
})
