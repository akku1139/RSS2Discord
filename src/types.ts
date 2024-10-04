export type RawFeed = {
  name: string,
  description?: string,
  url: string,
  icon: string,
  host?: string, // Proxyしたフィードの元データ ex: "blogbooks.net"
  base?: string, // WebHook設定用
  threadName?: string,
  test?: boolean, // 指定したら送信しない
  builder?: (feed: FormattedFeed) => Promise<Array<{ url: string, body: any }>>
}

export type FormattedFeed = RawFeed & {
  description: string,
  base: string,
  threadName: string,
  test: boolean,
  host: string,
  webhook: string,
  res: Promise<Response>
}
