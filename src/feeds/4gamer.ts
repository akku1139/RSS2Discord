import { makeFeeds, mapHelper } from "../utils.ts"

export default makeFeeds(
  mapHelper([
    { name: "PCゲーム", key: "pc/pc_news" },
    { name: "オンラインゲーム", key: "all_onlinegame" },
    { name: "オンラインRPG", key: "online/online_rpg" },
    { name: "Xbox Series X|S / Xbox One", key: "xbox360/xbox360_news" },
    { name: "PlayStation 5 / PlayStation 4 / Playstation 3 / Playstation 2", key: "ps3/ps3_news" },
    { name: "PS Vita / PSP", key: "psp/psp_news" },
    { name: "Nintendo Switch / Wii U / Wii", key: "wii/wii_news" },
    { name: "ニンテンドー3DS / DS", key: "nds/nds_news" },
    { name: "スマートフォン", key: "smartphone/smartphone_index" },
    { name: "ハードウェア", key: "hardware/hw_news" },
    { name: "アーケード", key: "arcade/arcade_news" },
    { name: "VR", key: "vr/vr_news" },
    { name: "インタビュー", key: "all_interview" },
    { name: "連載", key: "all_series" },
    { name: "レビュー", key: "all_review" },
    { name: "ムービー", key: "all_movie" },
    { name: "無料体験版", key: "all_demo" },
    { name: "注目の記事", key: "news_topics" },
    { name: "4Gamer.net", key: "index" },
  ], f => ({
    name: f.name,
    url: "https://www.4gamer.net/rss/" + f.key + ".xml",
    icon: "https://pbs.twimg.com/profile_images/1452883854914560002/RD2jcwNm_400x400.png",
    base: "https://www.4gamer.net",
    threadName: "4Gamer.net",
    description: "https://www.4gamer.net/rss/rss.shtml"
  })
  )
)
