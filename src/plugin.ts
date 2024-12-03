import { cleanAllURLParams } from "./plugins/urlClean.ts"
import { unEscapeHTML, enhancedUnEscapeHTML } from "./plugins/unEscapeHTML.ts"
import { unHTML } from "./plugins/unHTML.ts"
import type { FeedData, PluginList, TransformFunction } from "./types.ts"

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
  feedPlugins: PluginList | undefined,
  data: FeedData,
) => {
  if(feedPlugins === void 0) {
    return
  }

  feedPlugins.forEach(pluginName => {
    const plugin = plugins[pluginName]

    runPlugins(plugin?.deps?.pre, data)

    for(const key in data) {
      data[key] = transform(data[key], plugin?.transformer[key])
    }

    runPlugins(plugin?.deps?.post, data)
  })
}
