import { makePlugin } from "../utils.ts";

export const cleanAllURLParams = makePlugin({
  transformer: {
    url(s) {
      const p = new URL(s)
      return p.origin + p.pathname
    }
  }
})
