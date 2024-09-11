import { FormattedFeed } from "./feeds.ts";

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

export const log = {
  info: (...msg) => console.log("[  info  ]", ...msg),
  warn: (...msg) => console.warn("[  warn  ]", ...msg),
  error: (...msg) => console.error("[  error ]", ...msg),
} as const

export const sendWebHook = async (url: string, body: any, feed: FormattedFeed, db: {[key: string]: "a"}) => {
  let retryCount = 0
  while(true) {
    let r: Response
    try {
      r = await fetch(feed.webhook, {
        method: "POST",
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(body)
      })
    } catch(e) {
      log.error(feed.name, url, e)
      break
    }

    if(r.ok) {
      db[url] = "a"
      break
    } else if(retryCount > 5) {
      log.warn(url, "Exceeded maximum retry count")
      break
    } else if(r.status === 400) {
      // const ratelimit = r.headers.get("x-ratelimit-reset-after")
      r.text().then(t => log.error("400 Bad Request", feed.name, url, t, body))
      break
      /* if(ratelimit === null) {
        break
      } else {
        await sleep(Number(ratelimit))
        retryCount ++
        continue
      } */
    } else if(r.status === 429) {
      await sleep((await r.json()).retry_after)
      retryCount ++
      continue
    } else if(r.status === 500) {
      // const ratelimit = r.headers.get("x-ratelimit-reset-after")
      r.text().then(t => log.error("500 Internal Server Error", feed.name, url, t))
      break
      /* if(ratelimit === null) {
        break
      } else {
        await sleep(Number(ratelimit))
        retryCount ++
        continue
      } */
    } else {
      log.error("on webhook: ", feed.name, url, r.status, await r.text())
      break
    }
  }
}
