import feeds from "./feeds.ts";

const kv = await Deno.openKv("db/main.db");

let invalidFeeds: Array<String> = [];

let rateLimited = 0;

feeds.forEach(
  (feed) => fetch(feed.url).then(
    (res) => {
      if(!res.ok) {
        invalidFeeds.push(feed.host ?? feed.url);
      }
      
    }
  )
);

await kv.close();
