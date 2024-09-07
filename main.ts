import { parseFeed } from "rss"

import feeds from "./feeds.ts"

const db = JSON.parse(Deno.readTextFileSync("./db.json")) as {[key: string]: "a"}

let invalidFeeds: Array<string> = []

let rateLimited = 0

feeds.forEach(
  (feed) => fetch(feed.url).then(async (res) => {
    if(!res.ok) {
      invalidFeeds.push(feed.host ?? feed.url);
    }

    if(typeof feed.system === "undefined") {
      const data = await parseFeed(await res.text())
      data.entries.forEach(async (e) => {
        const url = e.links[0].href
        await fetch(feed.webhook, {
          headers: { 'Content-type': "application/json" },
          body: JSON.stringify({
            username: feed.name,
            avatar_url: feed.icon,
            embeds: [{
              url,
              color: 16777215,
              title: e?.title.value.substr(0, 256).padStart(1, "-"),
              description: e?.description.value.substr(0, 4096),
            }]
          })
        })
      })
    } // else {
      // const data = await feed.system.parser(
      //   await feed.system.loader(res)
      // )
    // }
  }) // .catch();
)

Deno.writeTextFileSync("./data.json", JSON.stringify(db))
