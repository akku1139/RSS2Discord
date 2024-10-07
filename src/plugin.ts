import { cleanAllURLParams } from "./plugins/urlClean.ts"
import { unEscapeHTML, enhancedUnEscapeHTML } from "./plugins/htmlUnEscape.ts"

export const plugins = {
  cleanAllURLParams,
  unEscapeHTML,
  enhancedUnEscapeHTML,
}
