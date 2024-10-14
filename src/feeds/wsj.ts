import { makeFeeds, mapHelper } from "../utils.ts"

export default makeFeeds(
  mapHelper([
    { name: "マーケット", key: "RSSJapanMarket" },
    { name: "Heard on the Street", key: "RSSJapanHeardonTheStreet" },
    { name: "ビジネス", key: "RSSJapanBusiness" },
    { name: "テクノロジー", key: "RSSJapanTechnology" },
    { name: "パーソナルテクノロジー", key: "RSSJapanPersonalTechnology" },
    { name: "国際", key: "RSSJapanNewsWorld" },
    { name: "Capital Journal", key: "RSSJapanCapitalJournal" },
    { name: "オピニオン・社説", key: "RSSJapanOpinion" },
    { name: "ライフ", key: "RSSJapanLife" },
    { name: "バロンズ", key: "RSSJapanBarrons" },
  ], f => ({
    name: f.name + " - ウォール・ストリート・ジャーナル日本語版",
    description: "https://jp.wsj.com/news/rss-news-and-feeds",
    url: "https://feeds.content.dowjones.io/public/rss/" + f.key,
    icon: "https://s.wsj.net/media/wsj_apple-touch-icon-180x180.png",
    base: "https://feeds.content.dowjones.io",
    threadName: "ウォール・ストリート・ジャーナル日本語版",
    plugins: ["unEscapeHTML"],
  })),
  mapHelper([
    { name: "Opinion", key: "RSSOpinion" },
    { name: "World News", key: "RSSWorldNews" },
    { name: "U.S. Business", key: "WSJcomUSBusiness" },
    { name: "Markets News", key: "RSSMarketsMain" },
    { name: "Technology: What's News", key: "RSSWSJD" },
    { name: "Lifestyle", key: "RSSLifestyle" },
  ], f => ({
    name: f.name + " - The Wall Street Journal",
    description: "https://www.wsj.com/news/rss-news-and-feeds",
    url: "https://feeds.a.dj.com/rss/" + f.key + ".xml",
    icon: "https://s.wsj.net/media/wsj_apple-touch-icon-180x180.png",
    base: "https://feeds.a.dj.com",
    threadName: "The Wall Street Journal"
  }))
)
