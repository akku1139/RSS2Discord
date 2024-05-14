const rawFeeds: Array<{
  name: string,
  url: string,
  icon?: string,
  type?: "rss1" | "rss2" | "atom" | string,
  host?: string, // Proxyしたフィードのホスト名
  base?: string, // WebHook設定用
}> = [
  {
    name: "虚構新聞",
    url: "https://kyoko-np.net/index.xml",
    icon: "https://kyoko-np.net/images/app.png",
  },
];

const webhooks = JSON.parse(Deno.env.get("WEBHOOKS"));

export default rawFeeds.map((feed) => ({
  name: feed.name,
  url: feed.url,
  icon: feed.icon ?? undefined,
  host: feed.host ?? new URL(feed.url).host,
  webhook: webhooks[feed.base ?? feed.url],
}));;
