import { FormattedFeed } from "./feeds.ts";
import { log, sleep } from "./utils.ts"

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
