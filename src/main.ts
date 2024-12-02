import { parseFeed, type Feed } from "rss"

import feeds from "./feed.ts"
import type { WebhookBody, FormattedFeed, FeedData } from "./types.ts"
import { log, hook, truncateString } from "./utils.ts"
import { sendWebhook } from "./send.ts"
import { threads } from "./defs.ts"
import { runPlugins } from "./plugin.ts"

const db: {[key: string]: "a"} = {}

const db_old = JSON.parse(await Deno.readTextFile('data/data.json')) as {[key: string]: "a"}
hook.clean.push(async () => {
  await Deno.writeTextFile('data/data.json', JSON.stringify(db, null, 2))
})

const executedFeeds = JSON.parse(await Deno.readTextFile('data/feeds.json')) as {[key: string]: "a"}
hook.clean.push(async () => {
  await Deno.writeTextFile('data/feeds.json', JSON.stringify(executedFeeds, null, 2))
})

const failFeeds: Array<string> = []
hook.clean.push(() => {
  log.info("Failed feeds:", failFeeds)
})

// --- main script ---

log.info("Scanning", feeds.length, "feeds")
log.info("threads (total):", new Set(feeds.map(f => f.base)).size)
log.info("threads (sent):", Object.keys(threads).length)

for(const feed of feeds) {
  if( !(feed.url in executedFeeds) ) {
    feed.test = true
  }

  let res
  try {
    res = await feed.res
  } catch(e) {
    log.error(`${feed.name} (${feed.url}): JavaScript Error`, e)
    continue
  }
  if(!res.ok) {
    log.error(`${feed.name} (${feed.url}): HTTP ${res.status} (${res.statusText})`)
    if(res.headers.get("X-Local-Error")) {
      res.text().then(() => log.error())
    }
    failFeeds.push(new URL(feed.url).host)
    continue
  }

  if(typeof feed.builder === "undefined") {
    let sentCount: number = 0
    let errorCount: number = 0
    let parsed: Feed
    try {
      parsed = await parseFeed(await res.text())
    } catch(err) {
      log.error(feed.name, err)
      failFeeds.push(new URL(feed.url).host)
      continue
    }
    for(const e of parsed.entries) {
      const data: FeedData = {
        url: e.links[0].href ?? "",
        description: e?.description?.value ?? ""
      }

      runPlugins(feed?.plugins, data)

      const url = data.url

      if(data.description === "") {
        data.description = void 0
      }

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
      const body: WebhookBody = {
        username: feed.name,
        avatar_url: feed.icon,
        embeds: [{
          url,
          color: 16777215,
          title: truncateString(e?.title?.value, 256) ?? "-",
          // description: data.description?.substring(0, 4096),
          description: truncateString(data.description, 400),
          timestamp,
          thumbnail: {
            url: (e?.attachments ?? [])[0]?.url
          }
        }]
      }

      const res = await sendWebhook(url, body, feed, db)
      if(res.error) {
        errorCount ++
      } else {
        sentCount ++
      }
    }
    log.info(
      feed.name, parsed.entries.length,
      "posts (sent:", sentCount, "error:", errorCount, ")",
      threads[feed.base] ? void 0 : "first run",
    )
  } else {
    let sentCount: number = 0
    let errorCount: number = 0
    let ret: Awaited<ReturnType<Exclude<FormattedFeed["builder"], undefined>>>
    try{
      ret = await feed.builder(feed)
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
      const res = await sendWebhook(r.url, r.body, feed, db)
      if(res.error) {
        errorCount ++
      } else {
        sentCount ++
      }
    }
    log.info(
      feed.name, ret.length,
      "posts (sent:", sentCount, "error:", errorCount, ")",
      threads[feed.base] ? void 0 : "first run",
    )
  }
  executedFeeds[feed.url] = "a"
}

Object.keys(db_old).forEach(r => {
  const o = new URL(r)
  if(failFeeds.includes(o.host)) {
    db[r] = "a"
  }
})

hook.clean.forEach((f) => f())
