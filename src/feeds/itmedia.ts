import { makeFeeds, mapHelper } from "../utils.ts"

export default makeFeeds(
  mapHelper([
    { name: "ITmedia NEWS", key: "news_bursts" },
    { name: "ITmedia AI＋", key: "aiplus" },
    { name: "ITmedia Mobile", key: "mobile" },
    { name: "ITmedia PC USER", key: "pcuser" },
    { name: "ITmedia ビジネスオンライン", key: "business" },
    { name: "ITmedia エグゼクティブ", key: "executive" },
    { name: "ITmedia マーケティング", key: "marketing" },
    { name: "＠IT", key: "ait" },
    { name: "キーマンズネット", key: "keymans" },
    { name: "TechTargetジャパン", key: "techtarget" },
    { name: "MONOist", key: "monoist" },
    { name: "EE Times Japan", key: "eetimes" },
    { name: "EDN Japan", key: "edn" },
    { name: "スマートジャパン", key: "smartjapan" },
    { name: "BUILT", key: "sj_built" },
    { name: "TechFactory", key: "techfactory" },
    { name: "ねとらぼ", key: "netlab" },
    { name: "Fav-Log by ITmedia", key: "fav" },
    { name: "ITmedia", key: "itmedia_all" },
  ], f => ({
    name: f.name,
    description: "https://corp.itmedia.co.jp/media/rss_list/",
    url: `https://rss.itmedia.co.jp/rss/2.0/${f.key}.xml`,
    icon: "https://image.itmedia.co.jp/info/images/itmapp_part_icon_1_1422324774.png",
    base: "https://rss.itmedia.co.jp",
    threadName: "ITmedia",
  }))
)
