import { makeFeeds } from "../utils.ts"

const addSIPrefix = (e: string) => {
  const units = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];
  let o = parseFloat(e);
  let n = 0
  for (; o >= 1e3;) {
    o /= 1000;
    n++;
  }
  return o.toFixed(2) + " " + units[n]
}

const timeSince = (e: number) => {
  let t = Math.floor(e / 31536e3);
  return t > 1 ? t + " y" : (t = Math.floor(e / 2592e3)) > 1 ? t + " months" : (t = Math.floor(e / 86400)) > 1 ? t + " days" : (t = Math.floor(e / 3600)) > 1 ? t + " hours" : (t = Math.floor(e / 60)) > 1 ? t + " min" : "NOW"
}

export default makeFeeds({
  name: "Mining Pool Stats新コイン通知",
  url: "https://miningpoolstats.stream/newcoins",
  base: "https://miningpoolstats.stream/newcoins",
  icon: "https://pbs.twimg.com/profile_images/1061222423612276737/ciKYxa2__400x400.jpg",
  threadName: "Mining Pool Stats新コイン通知",
  builder: async (feed) => {
    const timeParmReg = /;var last_time = "(\d+)";/.exec(
      await (await fetch("https://miningpoolstats.stream/newcoins")).text()
    )
    if (timeParmReg === null) {
      throw new Error(`${feed.name}: cannnot get time parameter`)
    }
    const timeParm = timeParmReg[1]
    const data = await (await fetch("https://data.miningpoolstats.stream/data/coins_data_new.js?t=" + timeParm)).json() as {
      data: Array<{
        name: string,
        algo: string,
        symbol: string,
        height: number,
        hashrate: number,
        unit: string,
        diff: number,
        pools: number,
        target: number,
        i: number,
        page: string,
        ph: number,
        typ: string,
        e24: number,
        bt: number,
        time: number,
        age: number,
      }>,
      time: number,
    }
    return data.data.map((d) => ({
      url: "https://miningpoolstats.stream/" + d.page,
      body: () => ({
        username: feed.name,
        avatar_url: feed.icon,
        embeds: [{
          author: {
            name: d.name + " [" + d.symbol + "]",
            url: "https://miningpoolstats.stream/" + d.page,
            icon_url: "https://miningpoolstats.stream/ico/" + d.page + ".webp",
          },
          color: 16777215,
          fields: [
            {
              inline: true,
              name: "Algorithm",
              value: d.algo
            }, {
              name: "Height",
              value: String(d.height),
              inline: true
            }, {
              name: "Pools",
              value: String(d.pools),
              inline: true
            }, {
              name: "Miner",
              value: d.typ,
              inline: true
            }, {
              name: "Hashrate",
              value: addSIPrefix(String(d.hashrate)) + d.unit,
              inline: true
            }, {
              name: "Difficulty",
              value: addSIPrefix(String(d.diff)),
              inline: true
            }
          ],
          footer: { text: "Age: " + timeSince(d.age) },
        }],
      }),
    }))
  }
})
