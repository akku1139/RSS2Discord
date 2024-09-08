import { parseFeed } from "rss"

import feeds from "./feeds.ts"
import { sendWebHook, sleep } from "./utils.ts"

const db = await Deno.openKv("./data.db")

const invalidFeeds: Array<string> = []

feeds.forEach(
  (feed) => {
    fetch(feed.url).then(async (res) => {
      if(!res.ok) {
        invalidFeeds.push(feed.host ?? feed.url);
      }

      if(typeof feed.builder === "undefined") {
        let data
        try {
          data = await parseFeed(await res.text())
        } catch(e) {
          console.error(feed.name, e)
          return
        }
        data.entries.forEach(async (e) => {
          const url = e.links[0].href
          if(typeof url === "undefined") {
            throw new Error(`in feed ${feed.name} (${feed.url}): url is undefined`)
          }

          if((await db.get([url])).value !== null) {
            return
          }

          let timestamp: string | undefined = void 0
          try {
            timestamp = e?.published?.toISOString()
          } catch(e) {
            console.error(feed.name, url, e)
          }
          const body = {
            username: feed.name,
            avatar_url: feed.icon,
            embeds: [{
              url,
              color: 16777215,
              title: e?.title?.value?.substr(0, 256).padStart(1, "-"),
              description: e?.description?.value?.substr(0, 4096),
              timestamp,
              thumbnail: (e?.attachments ?? [])[0]?.url
            }]
          }
          sendWebHook(url, body, feed, db)
        })
      } else {
        const ret = await feed.builder(feed)
        ret.forEach(r => sendWebHook(r.url, r.body, feed, db))
      }
    }).catch((e) => {
      console.error(e, e.stack)
    });
  }
)
