import { cleanAllURLParams } from "./plugins/urlClean.ts"
import { unEscapeHTML, enhancedUnEscapeHTML } from "./plugins/unEscapeHTML.ts"
import { unHTML } from "./plugins/unHTML.ts"
import type { FeedData, FormattedFeed, PluginList, TransformFunction } from "./types.ts"
import { linuxReleaseID } from "./plugins/linuxReleaseID.ts"

export const plugins = {
  cleanAllURLParams,
  unEscapeHTML,
  enhancedUnEscapeHTML,
  unHTML,
  linuxReleaseID,
}

const transform = (
  obj: string,
  transformFunc: TransformFunction | undefined,
  e: any,
) => {
  if(transformFunc === void 0) {
    return obj
  }
  return transformFunc(obj, e)
}

export const runPlugins = (
  feedPlugins: PluginList | undefined,
  data: FeedData,
  e: any,
) => {
  if(feedPlugins === void 0) {
    return
  }

  feedPlugins.forEach(pluginName => {
    const plugin = plugins[pluginName]

    runPlugins(plugin?.deps?.pre, data, e)

    for(const key in data) {
      data[key] = transform(data[key], plugin?.transformer[key], e)
    }

    runPlugins(plugin?.deps?.post, data, e)
  })
}
