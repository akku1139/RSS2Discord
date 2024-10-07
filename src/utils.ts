import type { Plugin, RawFeed } from "./types.ts"

export const addSIPrefix = (e: string) => {
  const units = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];
  let o = parseFloat(e);
  let n = 0
  for (; o >= 1e3;) {
    o /= 1000;
    n++;
  }
  return o.toFixed(2) + " " + units[n]
}

export const timeSince = (e: number) => {
  let t = Math.floor(e / 31536e3);
  return t > 1 ? t + " y" : (t = Math.floor(e / 2592e3)) > 1 ? t + " months" : (t = Math.floor(e / 86400)) > 1 ? t + " days" : (t = Math.floor(e / 3600)) > 1 ? t + " hours" : (t = Math.floor(e / 60)) > 1 ? t + " min" : "NOW"
}

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
