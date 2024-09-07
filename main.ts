import { parseFeed } from "rss"

import feeds from "./feeds.ts"
import { sleep } from "./utils.ts"

const db = await Deno.openKv("./data.db")

const invalidFeeds: Array<string> = []

feeds.forEach(
  (feed) => fetch(feed.url).then(async (res) => {
    if(!res.ok) {
      invalidFeeds.push(feed.host ?? feed.url);
    }

    if(typeof feed.system === "undefined") {
      const data = await parseFeed(await res.text())
      data.entries.forEach(async (e) => {
        const url = e.links[0].href
        if(typeof url === "undefined") {
          throw new Error(`in feed ${feed.name} (${feed.url}): url is undefined`)
        }

        if((await db.get([url])).value !== null) {
          return
        }

        let retryCount = 0
        while(true) {
          const r = await fetch(feed.webhook, {
            method: "POST",
            headers: { 'Content-type': "application/json" },
            body: JSON.stringify({
              username: feed.name,
              avatar_url: feed.icon,
              embeds: [{
                url,
                color: 16777215,
                title: e?.title?.value?.substr(0, 256).padStart(1, "-"),
                description: e?.description?.value?.substr(0, 4096),
                timestamp: e?.published,
                thumbnail: (e?.attachments ?? [])[0]?.url
              }]
            })
          })

          if(r.ok) {
            db.set([url], "a")
            console.log(url)
            break
          } else if(retryCount > 5) {
            break
          } else if(r.status === 429) {
            await sleep((await r.json()).retry_after)
            retryCount ++
          } else {
            console.error(r)
            break
          }
        }
      })
    } // else {
      // const data = await feed.system.parser(
      //   await feed.system.loader(res)
      // )
    // }
  }) // .catch();
)
