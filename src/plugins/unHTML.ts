import { makePlugin } from "../utils.ts";

// https://hodade.com/seiki/page.php?r_tag_sakujo
export const unHTML = makePlugin({
  transformer: {
    description: (desc) => {
      return desc.replaceAll(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
    }
  }
})
