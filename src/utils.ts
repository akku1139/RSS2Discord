import type { Plugin, RawFeed } from "./types.ts"

export const sleep = (s: number) => new Promise(resolve => setTimeout(resolve, 1000 * s))

export const filterUndefined = (a: Array<unknown>) => a.filter(e => {
  if(e === void 0) {
    return false
  }
  return true
})

export const log = {
  info:  (...msg: Array<unknown>) => console.log("[  info  ]", ...filterUndefined(msg)),
  warn:  (...msg: Array<unknown>) => console.warn("[  warn  ]", ...filterUndefined(msg)),
  error: (...msg: Array<unknown>) => console.error("[  error ]", ...filterUndefined(msg)),
} as const

export const hook: {[name: string]: Array<() => void>} = {
  clean: []
}

export const makeFeeds = (...feeds: Array<RawFeed | Array<RawFeed>>): Array<RawFeed> => {
  return feeds.flat()
}

export const makePlugin = (plugin: Plugin) => {
  return plugin
}

// 無意味なデフォ値 by ぷぬぷぬ
export const mapHelper = <T = {name: string, key: string}>(data: Array<T>, builder: (f: T) => RawFeed): Array<RawFeed> => {
  return data.map(builder)
}

export const truncateString = <T>(str: T, maxLength: number): string | T => {
  if(typeof str !== "string") {
    return str
  }

  if(str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...'
  } else {
    return str
  }
}

export const getEnv = (name: string) => {
  const env = Deno.env.get(name)
  if(env === void 0) {
    throw new Error(`environment variable is empty: ${name}`)
  } else {
    return env
  }
}
