import { cleanAllURLParams } from "./plugins/urlClean.ts"
import { unEscapeHTML, enhancedUnEscapeHTML } from "./plugins/unEscapeHTML.ts"
import { unHTML } from "./plugins/unHTML.ts"

export const plugins = {
  cleanAllURLParams,
  unEscapeHTML,
  enhancedUnEscapeHTML,
  unHTML,
}
