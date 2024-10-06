import { makePlugin } from "../utils";

export const cleanAllURLParams = makePlugin({
  transformer: {
    url(s) {
      const p = new URL(s)
      return p.origin + p.pathname
    }
  }
})
