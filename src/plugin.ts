import { cleanAllURLParams } from "./plugins/urlClean"
import { unEscapeHTML, enhancedUnEscapeHTML } from "./plugins/htmlUnEscape"

export const plugins = {
  cleanAllURLParams,
  unEscapeHTML,
  enhancedUnEscapeHTML,
}
