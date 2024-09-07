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
      data.entries.forEach((entry) => {
        console.log(entry)
      })
    } else {
      const data = await feed.system.parser(
        await feed.system.loader(res)
      )
    }
  }) // .catch();
)

Deno.writeTextFileSync("./data.json", JSON.stringify(db))
