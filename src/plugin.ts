import { cleanAllURLParams } from "./plugins/urlClean.ts"
import { unEscapeHTML, enhancedUnEscapeHTML } from "./plugins/unEscapeHTML.ts"
import { unHTML } from "./plugins/unHTML.ts"
import type { FeedData, PluguinList, TransformFunction } from "./types.ts"

export const plugins = {
  cleanAllURLParams,
  unEscapeHTML,
  enhancedUnEscapeHTML,
  unHTML,
}

const transform = (obj: string, transformFunc: TransformFunction | undefined) => {
  if(transformFunc === void 0) {
    return obj
  }
  return transformFunc(obj)
}

export const runPlugins = (
  plugins: PluguinList,
  data: FeedData,
) => {
  plugins.forEach(pluginName => {
    const plugin = plugins[pluginName]

    if(plugin.deps.pre) {
      runPlugins(plugin.deps.pre, data)
    }

    for(const key in data) {
      data[key] = transform(data[key], plugin?.transformer[key])
    }

    if(plugin.deps.post) {
      runPlugins(plugin.deps.post, data)
    }
  })
}
