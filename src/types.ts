import type { plugins } from "./plugin.ts"

type MaybePromise<T> = T | PromiseLike<T> | Promise<T>

// discord-api-types入れる?
// Web版VSCodeでも補完してほしい
export type WebhookBody = {
  content?: string,
  username?: string,
  avatar_url?: string,
  thread_name?: string,
  embeds?: Array<{
    author?: {
      name: string,
      url?: string,
      icon_url?: string,
    },
    url?: string,
    color?: number,
    title?: string,
    description?: string,
    timestamp?: string,
    fields?: Array<{
      name: string,
      value: string,
      inline?: boolean,
    }>,
    thumbnail?: {
      url?: string,
    },
  }>
}

export type RawFeed = {
  name: string,
  description?: string,
  url: string,
  icon: string,
  host?: string, // Proxyしたフィードの元データ ex: "blogbooks.net"
  base?: string, // WebHook設定用
  threadName?: string,
  test?: boolean, // 指定したら送信しない
  plugins?: PluginList,
  builder?: (feed: FormattedFeed) => MaybePromise<Array<{ url: string, body: () => MaybePromise<WebhookBody> }>>,
  webhook?: string,
}

export type FormattedFeed = RawFeed & {
  description: string,
  base: string,
  threadName: string,
  test: boolean,
  host: string,
  webhook: string,
  res: Promise<Response>,
  plugins: PluginList,
}

export type TransformFunction = (obj: string) => string

export type TransformTargets =
    "url"
  | "description"

export type Plugin = {
  transformer?: {
    [key in TransformTargets]?: TransformFunction
  },
  deps?: {
    pre?: PluginList,
    post?: PluginList,
  },
}

export type PluginNames = keyof typeof plugins

export type PluginList = Array<PluginNames>

export type FeedData = {[key in TransformTargets]: string | undefined}
