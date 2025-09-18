import { makePlugin } from "../utils.ts"

export const linuxReleaseID = makePlugin({
  transformer: {
    url: (link, e) => {
      return link + "#" + e?.title?.value
    }
  }
})
