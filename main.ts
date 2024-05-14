import { parseFeed } from "rss";

import feeds from "./feeds.ts";

const kv = await Deno.openKv("db/main.db");

let invalidFeeds: Array<string> = [];

let rateLimited = 0;

feeds.forEach(
  (feed) => fetch(feed.url).then(
    async (res) => {
      if(!res.ok) {
        invalidFeeds.push(feed.host ?? feed.url);
      }
      const feed = await parseFeed(await res.text());
      feed.entries.forEach((entry) => {
        console.log(entry);
      });
    }
  ) // .catch();
);

await kv.close();
