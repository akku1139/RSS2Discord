import { makeFeeds, truncateString } from "../utils.ts"
import { DOMParser } from "deno-dom"
import { unHTMLCore } from "../plugins/unHTML.ts"

export default makeFeeds({
  name: "AtCoder Posts (en)",
  url: "https://atcoder.jp/posts/",
  icon: "https://img.atcoder.jp/assets/logo.png",
  builder: async (feed) => {
    const doc = new DOMParser().parseFromString(
      await (await fetch("https://atcoder.jp/posts/")).text(),
      "text/html",
    )
    return Array.from(doc.querySelectorAll(".panel.panel-default")).map(e => {
      const url = "https://atcoder.jp" + e.querySelector(".panel-title").firstChild.getAttribute("href")
      return {
        url,
        body: {
          username: feed.name,
          avatar_url: feed.icon,
          embeds: [{
            url,
            color: 16777215,
            title: truncateString(e.querySelector(".panel-title").innerText, 256) ?? "-",
            description: truncateString(
              unHTMLCore(e.querySelector(".panel-body.blog-post").innerText),
              1000
            ),
            timestamp: new Date(e.querySelector(".timeago").getAttribute("datetime")).toISOString(),
          }]
        }
      }
    })
  },
  test: true
})
