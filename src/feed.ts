import { log } from "./utils.ts"
import type { RawFeed, FormattedFeed } from "./types.ts"

import core from "./feeds/core.ts"
import impress from "./feeds/impress.ts"
import miningpoolstats from "./feeds/miningpoolstats.ts"
import nytimes from "./feeds/nytimes.ts"
import trans from "./feeds/trans.ts"

const test = true

const rawFeeds: Array<RawFeed> = [
  ...core,
  ...impress,
  ...miningpoolstats,
  ...trans,
  ...nytimes,
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
    description: "https://www.nhk.or.jp/toppage/rss/index.html",
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
  ].map(f => ({
    name: f.name,
    description: "https://corp.itmedia.co.jp/media/rss_list/",
    url: `https://rss.itmedia.co.jp/rss/2.0/${f.key}.xml`,
    icon: "https://image.itmedia.co.jp/info/images/itmapp_part_icon_1_1422324774.png",
    base: "https://rss.itmedia.co.jp",
    threadName: "ITmedia",
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
  }, {
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
    // url: "https://coinpost.jp/rss.xml",
    url: "https://coinpost.jp/?feed=rsscach32",
    base: "https://coinpost.jp",
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
    { name: "マーケット", key: "RSSJapanMarket" },
    { name: "Heard on the Street", key: "RSSJapanHeardonTheStreet" },
    { name: "ビジネス", key: "RSSJapanBusiness" },
    { name: "テクノロジー", key: "RSSJapanTechnology" },
    { name: "パーソナルテクノロジー", key: "RSSJapanPersonalTechnology" },
    { name: "国際", key: "RSSJapanNewsWorld" },
    { name: "Capital Journal", key: "RSSJapanCapitalJournal" },
    { name: "オピニオン・社説", key: "RSSJapanOpinion" },
    { name: "ライフ", key: "RSSJapanLife" },
    { name: "バロンズ", key: "RSSJapanBarrons" },
  ].map(f => ({
    name: f.name + " - ウォール・ストリート・ジャーナル日本語版",
    description: "https://jp.wsj.com/news/rss-news-and-feeds",
    url: "https://feeds.content.dowjones.io/public/rss/" + f.key,
    icon: "https://s.wsj.net/media/wsj_apple-touch-icon-180x180.png",
    base: "https://feeds.content.dowjones.io",
    threadName: "ウォール・ストリート・ジャーナル日本語版",
  })), ...[
    { name: "Opinion", key: "RSSOpinion" },
    { name: "World News", key: "RSSWorldNews" },
    { name: "U.S. Business", key: "WSJcomUSBusiness" },
    { name: "Markets News", key: "RSSMarketsMain" },
    { name: "Technology: What's News", key: "RSSWSJD" },
    { name: "Lifestyle", key: "RSSLifestyle" },
  ].map(f => ({
    name: f.name + " - The Wall Street Journal",
    description: "https://www.wsj.com/news/rss-news-and-feeds",
    url: "https://feeds.a.dj.com/rss/" + f.key + ".xml",
    icon: "https://s.wsj.net/media/wsj_apple-touch-icon-180x180.png",
    base: "https://feeds.a.dj.com",
    threadName: "The Wall Street Journal"
  })), ...[
    { name: "时政", key: "politics" },
    { name: "社会", key: "society" },
    { name: "法治", key: "legal" },
    { name: "国际", key: "world" },
    { name: "台港澳", key: "haixia" },
    { name: "军事", key: "military" },
    { name: "全部", key: "ywkx" },
  ].map(f => ({
    name: f.name + " - 人民日报",
    description: "http://politics.people.com.cn/ywkx/GB/368825/index.html",
    url: "http://www.people.com.cn/rss/" + f.key + ".xml",
    icon: "http://politics.people.com.cn/img/MAIN/2013/08/113596/images/logo.gif",
    base: "http://www.people.com.cn",
    threadName: "人民日报"
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
  }, {
    name: "アストロアーツ",
    url: "https://www.astroarts.co.jp/article/feed.atom",
    icon: "https://yt3.googleusercontent.com/ytc/AIdro_lK9Qx3Xa2l5EmrIJ8VkBPK2k7PtGaR4QCc5nFuRYJFUQ=s160-c-k-c0x00ffffff-no-rj"
  }, {
    name: "AUTOMATON",
    url: "https://automaton-media.com/feed/",
    icon: "https://automaton-media.com/wp-content/uploads/2024/03/automaton-amp-logo.png"
  }, ...[
    { name: "ビジネス", key: "biz" },
    { name: "TECH", key: "tech" },
    { name: "Web Professional", key: "web" },
    { name: "デジタル", key: "digital" },
    { name: "iPhone/Mac", key: "mac" },
    { name: "ゲーム・ホビー", key: "hobby" },
    { name: "自作PC", key: "pc" }
  ].map(f => ({
    name: f.name + " - ASCII.jp",
    description: "https://ascii.jp/info/about_rss.html",
    url: "https://ascii.jp/" + f.key + "/rss.xml",
    icon: "https://pbs.twimg.com/profile_images/1612620704679329793/N5bSPFFS_400x400.jpg",
    base: "https://ascii.jp",
    threadName: "ASCII.jp"
  })), {
    name: "ASCII.jp",
    url: "https://ascii.jp/rss.xml",
    icon: "https://pbs.twimg.com/profile_images/1612620704679329793/N5bSPFFS_400x400.jpg",
    base: "https://ascii.jp"
  }, ...[
    { name: "news", key: "dw" },
    { name: "Latest Distributions", key: "dwd" },
    { name: "Latest Headlines", key: "news-headlines" },
    { name: "Packages", key: "dwp" },
  ].map(f => ({
    name: f.name + " - DistroWatch.com",
    description: "https://distrowatch.com",
    url: "https://distrowatch.com/news/" + f.key + ".xml",
    icon: "https://distrowatch.com/images/cpxtu/dwbanner.png",
    base: "https://distrowatch.com",
    threadName: "DistroWatch"
  })), {
    name: "WIRED.jp", // 他言語版もあるっぽい
    url: "https://wired.jp/feed/rss",
    icon: "https://pbs.twimg.com/profile_images/1605821808347082752/aymalKvn_400x400.jpg"
  }, {
    name: "THE GOLD ONLINE",
    url: "https://gentosha-go.com/list/feed/rss",
    icon: "https://pbs.twimg.com/profile_images/1685900736021053441/CoHHUCSW_400x400.jpg"
  }, {
    name: "エンジニアtype",
    url: "https://type.jp/et/feature/feed/",
    icon: "https://type.jp/common/img/layout/footer_site_id_logo01.png"
  }, {
    name: "Japaaan",
    url: "https://mag.japaaan.com/feed",
    icon: "https://pbs.twimg.com/profile_images/3469257935/0db49db253a2710fd1372b392d595798_400x400.jpeg"
  }, {
    name: "withnews",
    url: "https://withnews.jp/rss/consumer/new.rdf",
    icon: "https://pbs.twimg.com/profile_images/1207550416579252224/oecKIDmH_400x400.jpg"
  }, {
    name: "ガジェット通信",
    url: "https://getnews.jp/feed/ext/orig",
    icon: "https://pbs.twimg.com/profile_images/512441585976360960/DMd5at7__400x400.png"
  }, {
    name: "現代ビジネス",
    url: "https://gendai.media/list/feed/rss",
    icon: "https://gendai-m.ismcdn.jp/common/images/v3/logo/cover-logo.png"
  }, {
    name: "現代農業web",
    url: "https://gn.nbkbooks.com/?feed=rss2",
    icon: "https://gn.nbkbooks.com/wpblog/wp-content/uploads/2021/11/logo.png",
  }, {
    name: "旅する応用言語学",
    url: "https://www.nihongo-appliedlinguistics.net/wp/feed",
    icon: "https://www.nihongo-appliedlinguistics.net/wp/wp-content/uploads/2021/01/new-logo-150x150.jpg"
  }, {
    name: "The Cloudflare Blog",
    url: "https://blog.cloudflare.com/rss",
    icon: "https://pbs.twimg.com/profile_images/1600539069217480704/RzK50Sks_400x400.jpg"
  }, {
    name: "xkcd",
    url: "https://xkcd.com/atom.xml",
    icon: "https://xkcd.com/s/0b7742.png"
  }, {
    name: "PRESIDENT Online",
    url: "https://president.jp/list/rss",
    icon: "https://president.jp/common/icons/128x128.png"
  }, {
    name: "Arch Linux News",
    url: "https://archlinux.org/feeds/news/",
    icon: "https://archlinux.org/static/logos/apple-touch-icon-144x144.png",
  }, {
    name: "Arch Linux Packages",
    url: "https://archlinux.org/feeds/packages/",
    icon: "https://archlinux.org/static/logos/apple-touch-icon-144x144.png"
  }, {
    name: "AUR",
    url: "https://aur.archlinux.org/rss/modified",
    icon: "https://archlinux.org/static/logos/apple-touch-icon-144x144.png"
  }, {
    name: "fabcross",
    url: "https://fabcross.jp/rss.xml",
    icon: "https://fabcross.jp/images/common/apple-touch-icon-precomposed.png"
  }, {
    name: "NEWS | ホロライブプロダクション",
    url: "https://hololivepro.com/news/feed",
    icon: "https://pbs.twimg.com/profile_images/1805110423274016768/QSsckQWV_400x400.jpg"
  }, {
    name: "萌え萌えmoebuntu",
    url: "https://moebuntu.blog.fc2.com/?xml",
    icon: "https://moebuntu.web.fc2.com/img/moe_j_logo.png"
  }, {
    name: "東方Projectよもやまニュース",
    url: "https://touhou-project.news/feed.rss",
    // icon: "https://touhou-project.news/wp-content/themes/korindo/resources/img/favicon.ico"
    icon: "https://i.imgur.com/yjwXFbN.png"
  }, {
    name: "ダイヤモンド・オンライン",
    url: "https://diamond.jp/list/feed/rss/dol",
    icon: "https://pbs.twimg.com/profile_images/1355858337825386500/dN6N0nUi_400x400.jpg",
  }, {
    name: "TechFeed 公式記事",
    url: "https://techfeed.io/feeds/original-contents",
    icon: "https://play-lh.googleusercontent.com/lpVgh0bGMLPnIIjMvlsoMlSsPmkfQBBlr4kBgYUQOsnhaE3tE04jd7E-W-_XRXtVVLL2=w240-h480",
  }, {
    name: "CodeZine",
    url: "https://codezine.jp/rss/new/index.xml",
    icon: "https://pbs.twimg.com/profile_images/1267291016035307522/OEH0rwXO_400x400.jpg",
  }, {
    name: "Engadget",
    url: "https://www.engadget.com/rss.xml",
    icon: "https://s.yimg.com/kw/assets/apple-touch-icon-152x152.png"
  }, {
    name: "TechnoEdge",
    url: "https://www.techno-edge.net/rss20/index.rdf",
    icon: "https://pbs.twimg.com/profile_images/1650368239082541056/3JriLBez_400x400.jpg"
  }, {
    name: "価格.com マガジン",
    url: "https://kakakumag.com/rss/",
    icon: "https://pbs.twimg.com/profile_images/877052835182936064/yNkw85sy_400x400.jpg"
  }, ...[
    { name: "政治", key: "politics" },
    { name: "北朝鮮", key: "nk" },
    { name: "韓日関係", key: "japan-relationship" },
    { name: "経済", key: "economy" },
    { name: "社会・文化", key: "society-culture" },
    { name: "IT・科学", key: "it-science" },
    { name: "芸能・スポーツ", key: "entertainment-sports" },
    { name: "全般", key: "news" },
  ].map(f => ({
    name: f.name + " - 聯合ニュース日本語版",
    description: "https://jp.yna.co.kr/channel/rss",
    url: "https://jp.yna.co.kr/RSS/" + f.key + ".xml",
    icon: "https://r.yna.co.kr/global/home/v01/img/favicon-152.png",
    base: "https://jp.yna.co.kr",
    threadName: "聯合ニュース日本語版",
    transformer: {
      url: (s) => {
        const p = new URL(s)
        return p.origin + p.pathname
      }
    }
  })),
]

/*
まちカドまぞく画像bot
Nアニメ
BBC
forbesjapan.com

フォーラム化したらTRANsのフィードを分離しないと
*/

const WEBHOOK_URL = Deno.env.get("WEBHOOK_URL") ?? ""
if (WEBHOOK_URL === "") {
  throw new Error("Env WEBHOOK_URL is not set.")
}
const webhooks = await (
  await fetch(WEBHOOK_URL)
).json() as {
  [key: string]: string
}

export default rawFeeds.map((feed): FormattedFeed => {
  const base = feed.base ?? feed.url
  const webhook = webhooks[base]
  if (webhook === void 0 && feed.test === true) {
    log.warn(`${feed.name} (${feed.url}) has no webhooks configured. Use default hook.`)
  }
  const res = fetch(feed.url).catch<Response>(e => new Promise((resolve, _) => resolve(new Response(
    `Error: ${e.stack}`,
    {
      status: 500,
      headers: {
        "X-Local-Error": "yes"
      }
    }
  ))))
  return {
    // 上書きされるかもしれない
    description: feed.url,
    test: false,
    transformer: {},
    ...feed,
    threadName: (feed.threadName ?? feed.name).substring(0, 256),
    base,
    host: feed.host ?? new URL(feed.url).host, // 右辺評価省略によるプチ軽量化
    webhook: webhook ?? webhooks.default,
    res,
  }
})
