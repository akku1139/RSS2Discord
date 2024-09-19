import { parseFeed } from "rss"

import feeds, { FormattedFeed } from "./feeds.ts"
import { sendWebHook, log } from "./utils.ts"

const db_old = JSON.parse(await Deno.readTextFile('data.json')) as {[key: string]: "a"}
const db: {[key: string]: "a"} = {}

const failFeeds = []

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
        if(res.headers.get("X-Local-Error")) {
          res.text().then(() => log.error())
        }
        continue
      }
    } catch(e) {
      log.error(feed.name, e)
      failFeeds.push(new URL(feed.url).host)
      continue
    }
    log.info(feed.name, data.entries.length, "posts")
    for(const e of data.entries) {
      const url = e.links[0].href
      if(typeof url === "undefined") {
        log.error(`in feed ${feed.name} (${feed.url}): url is undefined`)
        continue
      }

      if(url in db_old) {
        db[url] = "a"
        delete db_old[url]
      }

      if(db[url] === "a") {
        continue
      }

      let timestamp: string | undefined = void 0
      try {
        timestamp = e?.published?.toISOString()
      } catch(err) {
        log.error(feed.name, url, err)
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
    let ret: Awaited<ReturnType<FormattedFeed["builder"]>>
    try{
      ret = await feed.builder(feed)
      log.info(feed.name, ret.length, "posts")
    } catch(e) {
      log.error(feed.name, e)
      failFeeds.push(new URL(feed.url).host)
      continue
    }

    for(const r of ret) {
      if(r.url in db_old) {
        db[r.url] = "a"
        delete db_old[r.url]
      }

      if(db[r.url] === "a") {
        continue
      }
      await sendWebHook(r.url, r.body, feed, db)
    }
  }
}

Object.keys(db_old).forEach(_o => {
  const o = new URL(_o)
  if(failFeeds.includes(o.host)) {
    db[_o] = "a"
  }
})

log.info("Failed feeds:", failFeeds)

await Deno.writeTextFile('data.json', JSON.stringify(db, null, 2))
