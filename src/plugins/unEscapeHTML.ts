import { makePlugin } from "../utils.ts"
import { unescape } from "@std/html/entities"
import entityList from "@std/html/named-entity-list.json" with { type: "json" }

export const unEscapeHTML = makePlugin({
  transformer: {
    description(s) {
      return unescape(s)
    }
  }
})

export const enhancedUnEscapeHTML = makePlugin({
  transformer: {
    description(s) {
      return unescape(s, { entityList })
    }
  }
})
