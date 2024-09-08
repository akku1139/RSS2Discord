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
    base: "https://www.nhk.or.jp",
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
    base: "https://rss.itmedia.co.jp",
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
  }, {
    name: "アニメ！アニメ！",
    url: "https://animeanime.jp/rss/index.rdf",
    icon: "https://animeanime.jp/base/images/touch-icon-180.png",
  }, {
    name: "ナショナル ジオグラフィック日本版",
    url: "https://news.yahoo.co.jp/rss/media/nknatiogeo/all.xml",
    icon: "https://s.yimg.jp/images/news/cobranding/nknatiogeo.gif",
  }, {
    name: "U-Site",
    url: "https://u-site.jp/feed",
    icon: "https://u-site.jp/wp-content/themes/usite/images/apple-touch-icon.png",
  }, {
    name: "電撃ホビーウェブ",
    url: "https://hobby.dengeki.com/feed",
    icon: "https://hobby.dengeki.com/wp-content/themes/hobby2021/common/img/logo.png",
  }, {
    name: "CNN.co.jp",
    url: "http://feeds.cnn.co.jp/rss/cnn/cnn.rdf",
    icon: "https://www.cnn.co.jp/media/cnn/images/common/logo_header_2015.gif",
  }, {
    name: "AFPBB News",
    url: "http://feeds.afpbb.com/rss/afpbb/afpbbnews", // SSLエラー
    icon: "https://afpbb.ismcdn.jp/common/images/apple-touch-icon2020.png",
  }, ...[
    {key: "World"},
    {key: "Africa"},
    {key: "Americas"},
    {name: "Asia Pacific", key: "AsiaPacific"},
    {key: "Europe"},
    {key: "MiddleEast"},
    {name: "U.S.", key: "US"},
    {key: "Education"},
    {name: "The Upshot", key: "Upshot"},
    {key: "Politics"},
    {name: "N.Y./Region", key: "NYRegion"},
    {key: "Business"},
    {name: "Energy & Environment", key:"EnergyEnvironment"},
    {name: "Small Business", key: "SmallBusiness"},
    {key: "Economy"},
    {name: "DealBook", key: "Dealbook"},
    {name: "Media & Advertising", key: "MediaandAdvertising"},
    {name: "Your Money", key: "YourMoney"},
    {key: "Technology"},
    {name: "Personal Tech", key: "PersonalTech"},
    {key: "Sports"},
    {key: "Baseball"},
    {name: "College Basketball", key: "CollegeBasketball"},
    {name: "College Football", key: "CollegeFootball"},
    {key: "Golf"},
    {key: "Hockey"},
    {name: "Pro-Basketball", key: "ProBasketball"},
    {name: "Pro-Football", key: "ProFootball"},
    {key: "Soccer"},
    {key: "Tennis"},
    {key: "Science"},
    {name: "Environment", key: "Climate"},
    {name: "Space & Cosmos", key: "Space"},
    {key: "Health"},
    {name: "Well Blog", key: "Well"},
    {key: "Arts"},
    {name: "Art & Design", key: "ArtandDesign"},
    {name: "Book Review", key: "Books/Review"},
    {key: "Dance"},
    {key: "Movies"},
    {key: "Music"},
    {key: "Television"},
    {key: "Theater"},
    {name: "Fashion & Style", key: "FashionandStyle"},
    {name: "Dining & Wine", key: "DiningandWine"},
    {name: "Love", key: "Weddings"},
    {name: "T Magazine", key: "tmagazine"},
    {key: "Travel"},
    {key: "Jobs"},
    {name: "Real Estate", key: "RealEstate"},
    {name: "Autos", key: "Automobiles"},
    {name: "Lens Blog", key: "Lens"},
    {key: "Obituaries"},
    {name: "Times Wire", key: "recent"},
    {name: "Most E-Mailed", key: "MostEmailed"},
    {name: "Most Shared", key: "MostShared"},
    {name: "Most Viewed", key: "MostViewed"},
    {name: "Sunday Opinion", key: "sunday-review"},
    {name: "Top", key: "HomePage"},
  ].map(f => ({
    name: (f.name ?? f.key) + " - The New York Times",
    url: `https://rss.nytimes.com/services/xml/rss/nyt/${f.key}.xml`,
    icon: "https://nytco-assets.nytimes.com/2021/09/NYTCO-WhiteT.jpg",
    base: "https://rss.nytimes.com",
  })), ...[
    {name: "Charles M. Blow", key: "charles-m-blow"},
    {name: "Jamelle Bouie", key: "jamelle-bouie"},
    {name: "David Brooks", key: "david-brooks"},
    {name: "Frank Bruni", key: "frank-bruni"},
    {name: "Gail Collins", key: "gail-collins"},
    {name: "Ross Douthat", key: "ross-douthat"},
    {name: "Maureen Dowd", key: "maureen-dowd"},
    {name: "Thomas L. Friedman", key: "thomas-l-friedman"},
    {name: "Michelle Goldberg", key: "michelle-goldberg"},
    {name: "Ezra Klein", key: "ezra-klein"},
    {name: "Nicholas D. Kristof", key: "nicholas-kristof"},
    {name: "Paul Krugman", key: "paul-krugman"},
    {name: "Farhad Manjoo", key: "farhad-manjoo"},
    {name: "Bret Stephens", key: "bret-stephens"},
  ].map(f => ({
    name: f.name + "'s Column - The New York Times",
    url: `https://www.nytimes.com/svc/collections/v1/publish/www.nytimes.com/column/${f.key}/rss.xml`,
    icon: "https://nytco-assets.nytimes.com/2021/09/NYTCO-WhiteT.jpg",
    base: "https://rss.nytimes.com",
  })), ...[
    {name: "マーケット", key: "RSSJapanMarket"},
    {name: "Heard on the Street", key: "RSSJapanHeardonTheStreet"},
    {name: "ビジネス", key: "RSSJapanBusiness"},
    {name: "テクノロジー", key: "RSSJapanTechnology"},
    {name: "パーソナルテクノロジー", key: "RSSJapanPersonalTechnology"},
    {name: "国際", key: "RSSJapanNewsWorld"},
    {name: "Capital Journal", key: "RSSJapanCapitalJournal"},
    {name: "オピニオン・社説", key: "RSSJapanOpinion"},
    {name: "ライフ", key: "RSSJapanLife"},
    {name: "バロンズ", key: "RSSJapanBarrons"},
  ].map(f => ({
    name: f.name + " - ウォール・ストリート・ジャーナル日本語版",
    url: "https://feeds.content.dowjones.io/public/rss/" + f.key,
    icon: "https://s.wsj.net/media/wsj_apple-touch-icon-180x180.png",
    base: "https://feeds.content.dowjones.io",
  })), ...[
    {name: "Opinion", key: "RSSOpinion"},
    {name: "World News", key: "RSSWorldNews"},
    {name: "U.S. Business", key: "WSJcomUSBusiness"},
    {name: "Markets News", key: "RSSMarketsMain"},
    {name: "Technology: What's News", key: "RSSWSJD"},
    {name: "Lifestyle", key: "RSSLifestyle"},
  ].map(f => ({
    name: f.name + " - The Wall Street Journal",
    url: "https://feeds.a.dj.com/rss/" + f.key + ".xml",
    icon: "https://s.wsj.net/media/wsj_apple-touch-icon-180x180.png",
    base: "https://feeds.a.dj.com",
  })), ...[
    {name: "政治", key: "politics"},
    {name: "北朝鮮", key: "nk"},
    {name: "韓日関係", key: "japan-relationship"},
    {name: "経済", key: "economy"},
    {name: "社会・文化", key: "society-culture"},
    {name: "IT・科学", key: "it-science"},
    {name: "芸能・スポーツ", key: "entertainment-sports"},
    {name: "全般", key: "news"},
  ].map(f => ({
    name: f.name + " - 聯合ニュース日本語版",
    url: "https://jp.yna.co.kr/RSS/" + f.key + ".xml",
    base: "https://jp.yna.co.kr"
  })), ...[
    {name: "时政", key: "politics"},
    {name: "社会", key: "society"},
    {name: "法治", key: "legal"},
    {name: "国际", key: "world"},
    {name: "台港澳", key: "haixia"},
    {name: "军事", key: "military"},
    {name: "全部", key: "ywkx"},
  ].map(f => ({
    name: f.name + " - 人民日报",
    url: "http://www.people.com.cn/rss/" + f.key + ".xml",
    icon: "http://politics.people.com.cn/img/MAIN/2013/08/113596/images/logo.gif",
    base: "http://www.people.com.cn"
  })), {
    name: "IPAセキュリティセンター:重要なセキュリティ情報",
    url: "https://www.ipa.go.jp/security/alert-rss.rdf",
    icon: "https://www.ipa.go.jp/apple-touch-icon-180x180.png",
  }, {
    name: "The Keyword",
    url: "https://blog.google/rss/",
    icon: "https://blog.google/static/blogv2/images/apple-touch-icon.png",
  }, {
    name: "JVN",
    url: "https://jvn.jp/rss/jvn.rdf",
    icon: "https://www.ipa.go.jp/apple-touch-icon-180x180.png",
  }, ...[
    {
      name: "Zenn",
      url: "https://zenn.dev/p/trans/feed",
      //icon: "https://static.zenn.studio/images/icon.png",
      icon: "https://static.zenn.studio/images/logo-transparent.png",
    }, {
      name: "note",
      url: "https://note.com/kombumori/m/me3717a077c16/rss",
      icon: "https://theme.zdassets.com/theme_assets/2318981/c1e35dfc4394b7982d2ea5e5a5a2e9c1621247cf.png",
    }, {
      name: "Qiita",
      url: "https://qiita.com/organizations/trans-dev/activities.atom",
      icon: "https://cdn.qiita.com/assets/public/qiita-pwa-icon_512-4f5b031e6cb002cb865db0dd38635a78.png",
    }
  ].map(f => ({
    ...f,
    base: "trans"
  }))
]

/*
https://github.com/akku1139/GAS-RSS/blob/main/feeds.gs
まちカドまぞく画像bot
Nアニメ
Mining Pool Stats
  // https://www.astroarts.co.jp/
  // https://automaton-media.com/
  // https://ascii.jp/info/about_rss.html
  // https://distrowatch.com/news/dw.xml
  // https://gentosha-go.com/
  // https://wired.jp/
  // BBC
  // https://mag.japaaan.com/feed
  // forbesjapan.com
  // https://withnews.jp/rss/consumer/new.rdf
  // https://getnews.jp
*/

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

export default rawFeeds.map((feed): FormattedFeed => {
  const webhook = webhooks[feed.base ?? feed.url]
  if(webhook === void 0) {
    console.log(`${feed.name} (${feed.url}) has no webhooks configured. Use default hook.`)
  }
  return {
    ...feed,
    host: feed.host ?? new URL(feed.url).host,
    webhook: webhook ?? webhooks.default,
  }
})
