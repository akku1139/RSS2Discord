
import feeds from "./feeds.ts";


let invalidFeeds: Array<string> = [];

let rateLimited = 0;

feeds.forEach(
  (feed) => fetch(feed.url).then(async (res) => {
    if(!res.ok) {
      invalidFeeds.push(feed.host ?? feed.url);
    }
    const data = await feed.parser(await feed.loader(res));
    data.entries.forEach((entry) => {
      console.log(entry);
    });
  }) // .catch();
);
