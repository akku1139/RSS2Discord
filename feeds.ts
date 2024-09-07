import { parseFeed } from "rss";

interface RawFeed {
  name: string,
  url: string,
  icon?: string,
  host?: string, // Proxyしたフィードの元データ
  base?: string, // WebHook設定用
}

const rawFeeds: Array<RawFeed> = [
  {
    name: "虚構新聞",
    url: "https://kyoko-np.net/index.xml",
    icon: "https://kyoko-np.net/images/app.png",
  },
];

const webhooks = JSON.parse(Deno.env.get("WEBHOOK_URL")) as {
  [key: string]: string
};

interface FormattedFeed extends RawFeed {
  webhook: string,
  loader: (res: Response) => Promise<string>,
  parser: (data: string) => Promise<object>,
}

export default rawFeeds.map((feed): FormattedFeed => ({
  ...feed,
  host: feed.host ?? new URL(feed.url).host,
  webhook: webhooks[feed.base ?? feed.url] ?? webhooks.default,
  loader: (r) => r.text(),
  parser: parseFeed,
}));
