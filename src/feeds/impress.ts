import { makeFeeds, mapHelper } from "../utils.ts"

export default makeFeeds(
  mapHelper([
    {
      name: "Impress Watch",
      url: "https://www.watch.impress.co.jp/data/rss/1.0/ipw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/1042611424369864704/Vdq78CFJ_400x400.jpg"
    }, {
      name: "INTERNET Watch",
      url: "https://internet.watch.impress.co.jp/data/rss/1.0/iw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/458811138600210432/-82Izx1O_400x400.png"
    }, {
      name: "PC Watch",
      url: "https://pc.watch.impress.co.jp/data/rss/1.0/pcw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/1564822392299405312/S4cIjjUt_400x400.jpg"
    }, {
      name: "デジカメ Watch",
      url: "https://dc.watch.impress.co.jp/data/rss/1.0/dcw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/457079189296779265/lzIVLy24_400x400.png"
    }, {
      name: "AKIBA PC Hotline",
      url: "https://akiba-pc.watch.impress.co.jp/data/rss/1.0/ah/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/875611464563687424/lVTDx6Yd_400x400.jpg"
    }, {
      name: "AV Watch",
      url: "https://av.watch.impress.co.jp/data/rss/1.0/avw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/455608979981234176/WO-8xlvx_400x400.png"
    }, {
      name: "家電 Watch",
      url: "https://kaden.watch.impress.co.jp/data/rss/1.0/kdw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/150013278/kaden_400x400.jpg"
    }, {
      name: "ケータイ Watch",
      url: "https://k-tai.watch.impress.co.jp/data/rss/1.0/ktw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/1704679557574656000/HYX8bOrZ_400x400.png"
    }, {
      name: "クラウド Watch",
      url: "https://cloud.watch.impress.co.jp/data/rss/1.0/clw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/457044464138088449/hAz85fUt_400x400.jpeg"
    }, {
      name: "窓の杜",
      url: "https://forest.watch.impress.co.jp/data/rss/1.0/wf/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/455934939234451456/gJW7YnRx_400x400.png"
    }, {
      name: "こどもとIT",
      url: "https://edu.watch.impress.co.jp/data/rss/1.0/kit/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/1482924189845983237/ju0xL2hx_400x400.jpg"
    }, {
      name: "Car Watch",
      url: "https://car.watch.impress.co.jp/data/rss/1.0/car/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/785418072/caw_reasonably_small.gif"
    }, {
      name: "トラベル Watch",
      url: "https://travel.watch.impress.co.jp/data/rss/1.0/trw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/1115882478265339908/XSP4-20n_400x400.png"
    }, {
      name: "グルメ Watch",
      url: "https://gourmet.watch.impress.co.jp/data/rss/1.0/grw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/1373792669185413122/DH3YJce4_400x400.jpg"
    }, {
      name: "GAME Watch",
      url: "https://game.watch.impress.co.jp/data/rss/1.0/gmw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/867928177565237248/51EgY2PQ_400x400.jpg"
    }, {
      name: "HOBBY Watch",
      url: "https://hobby.watch.impress.co.jp/data/rss/1.0/hbw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/1260140455083167745/wfF_VoR__400x400.jpg"
    }, {
      name: "MANGA Watch",
      url: "https://manga.watch.impress.co.jp/data/rss/1.0/mgw/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/1749608646479433728/QsgQ08ZX_400x400.jpg"
    }, {
      name: "Watch Video",
      url: "https://video.watch.impress.co.jp/data/rss/1.0/video/feed.rdf",
      icon: "https://pbs.twimg.com/profile_images/745442672295325696/LZFTJTzv_200x200.jpg"
    }, {
      name: "ドローンジャーナル",
      url: "https://drone-journal.impress.co.jp/data/rss/1.0/drone/feed.xml",
      icon: "https://pbs.twimg.com/profile_images/769071875892908032/4zSb3x6W_400x400.jpg"
    }, {
      name: "できるネット",
      url: "https://dekiru.net/feed",
      icon: "https://pbs.twimg.com/profile_images/1177394121033445376/wlysppTs_200x200.jpg"
    },
  ], f => ({
    ...f,
    base: "impress.co.jp",
    threadName: "Impress"
  })),
  {
    name: "ネタとぴ",
    url: "https://netatopi.jp/ntp.rdf",
    icon: "https://pbs.twimg.com/profile_images/601596045743693826/grZqTMYQ_400x400.png"
  }
)
