import { parseFeed } from "rss"

import feeds from "./feeds.ts"
import { sendWebHook, log } from "./utils.ts"

let db = JSON.parse(await Deno.readTextFile('data.json'))

for(const feed of feeds) {
  const res = await feed.res
  if(!res.ok) {
    log.error(`${feed.name} (${feed.url}): HTTP ${res.status} (${res.statusText})`)
    continue
  }

  if(typeof feed.builder === "undefined") {
    let data: {entries: Array<any>}
    try {
      if(res.ok) {
        data = await parseFeed(await res.text())
      } else {
        log.error(`${feed.name} returned HTTP error ${res.status} (${res.statusText})`)
        continue
      }
    } catch(e) {
      log.error(feed.name, e)
      continue
    }
    log.info(feed.name, data.entries.length, "posts")
    for(const e of data.entries) {
      const url = e.links[0].href
      if(typeof url === "undefined") {
        log.error(`in feed ${feed.name} (${feed.url}): url is undefined`)
        continue
      }

      if(db[url] === "a") {
        continue
      }

      let timestamp: string | undefined = void 0
      try {
        timestamp = e?.published?.toISOString()
      } catch(e) {
        log.error(feed.name, url, e)
      }
      const body = {
        username: feed.name,
        avatar_url: feed.icon,
        embeds: [{
          url,
          color: 16777215,
          title: e?.title?.value?.substr(0, 256) ?? "-",
          description: e?.description?.value?.substr(0, 4096),
          timestamp,
          thumbnail: {
            url: (e?.attachments ?? [])[0]?.url
          },
        }]
      }
      await sendWebHook(url, body, feed, db)
    }
  } else {
    const ret = await feed.builder(feed)
    log.info(feed.name, ret.length, "posts")
    for(const r of ret) {
      if(db[r.url] === "a") {
        continue
      }
      await sendWebHook(r.url, r.body, feed, db)
    }
  }
}

await Deno.writeTextFile('data.json', JSON.stringify(db, null, 2))
