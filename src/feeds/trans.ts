import type { RawFeed } from "../types.ts"
import { makeFeeds, mapHelper } from "../utils.ts"

export default makeFeeds(
  mapHelper<RawFeed>([ // あまり良い型指定じゃない
    {
      name: "Zenn",
      url: "https://zenn.dev/p/trans/feed",
      //icon: "https://static.zenn.studio/images/icon.png",
      icon: "https://static.zenn.studio/images/logo-transparent.png",
    }, {
      name: "note",
      url: "https://note.com/kombumori/m/me3717a077c16/rss",
      icon: "https://theme.zdassets.com/theme_assets/2318981/c1e35dfc4394b7982d2ea5e5a5a2e9c1621247cf.png",
      plugins: ["unHTML"],
    }, {
      name: "Qiita",
      url: "https://qiita.com/organizations/trans-dev/activities.atom",
      icon: "https://cdn.qiita.com/assets/public/qiita-pwa-icon_512-4f5b031e6cb002cb865db0dd38635a78.png",
    }
  ], f => ({
    ...f,
    base: "trans",
    test: true,
    hello: true, // 型の実験
  }))
)
