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
  }, {
    name: "ギズモード・ジャパン",
    url: "https://www.gizmodo.jp/index.xml",
    icon: "https://pbs.twimg.com/profile_images/1104329078759280640/N9IqVEvv_400x400.jpg",
  }, {
    name: "gihyo.jp",
    url: "https://gihyo.jp/feed/rss2",
    icon: "https://pbs.twimg.com/profile_images/1551442704675983360/9_CHplsd_400x400.png",
  }, ...[...Array(9).keys()].map(i => ({
    name: "NHK News",
    url: `https://www.nhk.or.jp/rss/news/cat${i}.xml`,
    icon: "https://i.imgur.com/76KCIrY.png",
  })), {
    name: "3Blue1Brown",
    url: "https://3blue1brown.substack.com/feed",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/3B1B_Logo.svg/1200px-3B1B_Logo.svg.png",
  }, {
    name: "fedimagazine.tokyo",
    url: "https://fedimagazine.tokyo/feed/",
    icon: "https://fedimagazine.tokyo/wp-content/uploads/2023/10/cropped-favicon.png",
  }, {
    name: "GNU social JP Web",
    url: "https://web.gnusocial.jp/feed/",
    icon: "https://web.gnusocial.jp/wp-content/uploads/2022/07/cropped-GNU_Social_Image_Logo-4.png",
  }, ...[
    {name: "ITmedia NEWS", key: "news_bursts"},
    {name: "ITmedia AI＋", key: "aiplus"},
    {name: "ITmedia Mobile", key: "mobile"},
    {name: "ITmedia PC USER", key: "pcuser"},
    {name: "ITmedia ビジネスオンライン", key: "business"},
    {name: "ITmedia エグゼクティブ", key: "executive"},
    {name: "ITmedia マーケティング", key: "marketing"},
    {name: "＠IT", key: "ait"},
    {name: "キーマンズネット", key: "keymans"},
    {name: "TechTargetジャパン", key: "techtarget"},
    {name: "MONOist", key: "monoist"},
    {name: "EE Times Japan", key: "eetimes"},
    {name: "EDN Japan", key: "edn"},
    {name: "スマートジャパン", key: "smartjapan"},
    {name: "BUILT", key: "sj_built"},
    {name: "TechFactory", key: "techfactory"},
    {name: "ねとらぼ", key: "netlab"},
    {name: "Fav-Log by ITmedia", key: "fav"},
    {name: "ITmedia", key: "itmedia_all"},
  ].map(f => ({
    name: f.name,
    url: `https://rss.itmedia.co.jp/rss/2.0/${f.key}.xml`,
    icon: "https://image.itmedia.co.jp/info/images/itmapp_part_icon_1_1422324774.png",
  })), {
    name: "AIDB",
    url: "https://ai-data-base.com/feed",
    icon: "https://yt3.googleusercontent.com/ytc/AIdro_lf41HCuIWcXUjxiflA2tyVVVMrsnkgJcwySW2r=s176-c-k-c0x00ffffff-no-rj",
  }, {
    name: "ゲームビズ",
    url: "https://gamebiz.jp/feed.rss",
    icon: "https://pbs.twimg.com/profile_images/1507243962662518786/ADct9342_200x200.jpg",
  }, {
    name: "ほのぼの日本史",
    url: "https://hono.jp/feed/",
    icon: "https://hono.jp/wp-content/uploads/2022/02/100610488_101613778244466_3921142606800617472_n.jpg",
  }, {
    name: "CVE",
    url: "https://cvefeed.io/rssfeed/latest.xml",
    icon: "https://files.mastodon.social/accounts/avatars/110/947/035/793/757/493/original/4b056135673f8725.png",
  }, {
    name: "BlogBooks Library",
    url: "https://blogbooks.net/feed",
    icon: "https://blogbooks.net/wp-content/uploads/2022/08/logo-2.png",
  }, {
    name: "テクニカル諏訪子",
    url: "https://technicalsuwako.moe/blog.atom",
    icon: "https://technicalsuwako.moe/static/Eqjk_WgVQAE2psn-new.jpeg",
  },{
    name: "Publickey",
    url: "https://www.publickey1.jp/atom.xml",
    icon: "https://pbs.twimg.com/profile_images/256913586/publickey_icon_400x400.png",
  }, {
    name: "AdGuard",
    url: "https://adguard.com/blog/rss-ja.xml",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/AdGuard.svg/640px-AdGuard.svg.png",
  }, {
    name: "特務機関NERV",
    url: "https://unnerv.jp/@UN_NERV.rss",
    icon: "https://media.unnerv.jp/accounts/avatars/000/000/001/original/d53dd7b3255a6f46.png",
  }, {
    name: "akku's website",
    url: "https://akku1139.github.io/index.xml",
    icon: "https://akku1139.github.io/images/favicon.png",
  }, {
    name: "CoinPost",
    url: "https://coinpost.jp/rss.xml",
    // url: "https://coinpost.jp/?feed=rsscach32",
    icon: "https://coinpost.jp/img/icon.png",
  },
]

const WEBHOOK_URL = Deno.env.get("WEBHOOK_URL") ?? ""
if(WEBHOOK_URL === "") {
  throw new Error("Env WEBHOOK_URL is not set.")
}
const webhooks = await (
  await fetch(WEBHOOK_URL)
).json() as {
  [key: string]: string
}

interface FormattedFeed extends RawFeed {
  webhook: string,
  system?: {
    loader: (res: Response) => Promise<string>,
    parser: (data: string) => Promise<object>,
  }
}

export default rawFeeds.map((feed): FormattedFeed => ({
  ...feed,
  host: feed.host ?? new URL(feed.url).host,
  webhook: webhooks[feed.base ?? feed.url] ?? webhooks.default,
}))
