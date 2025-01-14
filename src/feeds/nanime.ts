import type { WebhookBody } from "../types.ts"
import { makeFeeds } from "../utils.ts"
import { parse } from "xml"

export default makeFeeds({
  name: "Nアニメ", // 上書きされます
  url: "https://anime.nicovideo.jp/latest/",
  icon: "https://anime.nicovideo.jp/ogp.png", // 仮データ
  async builder(feed) {
    /*
    function s(v) {
      return v.trim().replace(/&(lt|gt|amp|quot|#x27|#x60|#x2F|#x3D);/g, function (m) {
        return {
          '&lt;': '<',
          '&gt;': '>',
          '&amp;': '&',
          '&quot;': '"',
          '&#x27;': "'",
          '&#x60;': '`',
          '&#x2F;': '/',
          '&#x3D;': '='
        }[m]
      })
    }
    ; function n(v) {
      return parseInt(v || '0', 10)
    }
    ; function b(v) {
      return v.toLowerCase() === 'true'
    }
    ; function a(v) {
      return v.filter(function (e) {
        return e !== ''
      })
    }
    ; function d_o(v) {
      return new Date(n(v + '000'))
    }
    ; function d_s(v) {
      return new Date(v + '+09:00')
    }
    */
    const parsed = new Function(`
      const s = v => v.trim().replace(
        /&(lt|gt|amp|quot|#x27|#x60|#x2F|#x3D);/g,
        m => {
          return {
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&quot;': '"',
            '&#x27;': "'",
            '&#x60;': '\`',
            '&#x2F;': '/',
            '&#x3D;': '=',
          }[m];
        }
      )
      const n = v => parseInt(v || '0', 10);
      const b = v => v.toLowerCase() === 'true';
      const a = v => v.filter(e => e !== '');
      const d_o = v => new Date(n(v + '000'));
      const d_s = v => new Date(v + '+09:00');
      return ${
        /window\.TKTK\['new_video'\] = (\[.*\]);/.exec(await (await feed.res).text())[1]
      };
    `)() as Array<{
      title: string,
      watchUrl: string,
      thumbnailUrl: string,
      tagList:Array<string>,
      startTime: Date,
      lengthSeconds: number,
      viewCounter: number,
      commentCounter: number,
      mylistCounter: number,
      videoPpvType: string,
    }>
    /* {
      title: s(s("遊☆戯☆王ゴーラッシュ！！ 第140話 ")),
      watchUrl: s(s("https://www.nicovideo.jp/watch/so44516285 ")),
      thumbnailUrl: s(s("https://nicovideo.cdn.nimg.jp/thumbnails/44516285/44516285.14783412 ")),
      tagList: a([s(s("アニメ ")), s(s("遊☆戯☆王ゴーラッシュ！！ ")), s(s("遊☆戯☆王 ")), s(s("2025冬アニメ公式 ")), s(s("2025年冬アニメ ")), ]),
      startTime: d_s('2025-01-14T12:00'),
      lengthSeconds: n('1440'),
      viewCounter: n('786'),
      commentCounter: n('142'),
      mylistCounter: n('3'),
      videoPpvType: s(s("free ")),
    } */

    return await Promise.all(parsed.map(async i => {
      const d = parse(await (
        await fetch(i.watchUrl.replace("https://www.nicovideo.jp/watch/", "https://ext.nicovideo.jp/api/getthumbinfo/"))
      ).text()) as {
        "@version": string,
        "@encoding": string,
        "nicovideo_thumb_response": {
          "@status": "ok" | string,
          "thumb": {
            "video_id": string,
            "title": string,
            "description": string,
            "thumbnail_url": string,
            "first_retrieve": string,
            "length": string,
            "movie_type": string,
            "size_high": string,
            "size_low": string,
            "view_counter": string,
            "comment_num": string,
            "mylist_counter": string,
            "last_res_body": string,
            "watch_url": string,
            "thumb_type": string,
            "embeddable": string,
            "no_live_play": string,
            "tags": {
              "@domain": "jp",
              "tag": Array<{
                "#text": string,
                "@lock": "1" | string
              }>
            },
            "genre": string,
            "ch_id": string,
            "ch_name": string,
            "ch_icon_url": string
          }
        }
      }

      /* {
        "@version": "1.0",
        "@encoding": "UTF-8",
        "nicovideo_thumb_response": {
          "@status": "ok",
          "thumb": {
            "video_id": "so44516285",
            "title": "遊☆戯☆王ゴーラッシュ！！ 第140話",
            "description": "動画一覧はこちら無料動画や最新情報・生放送・マンガ・イラストは Nアニメ遊☆戯☆王 ゴーラッシュ！！2022春アニメ　アニメ無料動画　アニメランキング声優情報　ランズベリー・アーサー　熊谷俊輝",
            "thumbnail_url": "https://nicovideo.cdn.nimg.jp/thumbnails/44516285/44516285.14783412",
            "first_retrieve": "2025-01-14T12:00:00+09:00",
            "length": "24:00",
            "movie_type": "mp4",
            "size_high": "1",
            "size_low": "1",
            "view_counter": "1650",
            "comment_num": "288",
            "mylist_counter": "4",
            "last_res_body": "普段の態度は前とそこ 絶対やばい奴だよ… 現代基準で言えばそう 結果的にアイツと同じ やっぱ絶対スタッフに",
            "watch_url": "https://www.nicovideo.jp/watch/so44516285",
            "thumb_type": "video",
            "embeddable": "1",
            "no_live_play": "0",
            "tags": {
              "@domain": "jp",
              "tag": [{
                  "#text": "アニメ",
                  "@lock": "1"
                }, {
                  "#text": "遊☆戯☆王ゴーラッシュ！！",
                  "@lock": "1"
                }, {
                  "#text": "遊☆戯☆王",
                  "@lock": "1"
                }, {
                  "#text": "2025冬アニメ公式",
                  "@lock": "1"
                }, {
                  "#text": "2025年冬アニメ",
                  "@lock": "1"
                }
              ]
            },
            "genre": "アニメ",
            "ch_id": "2648351",
            "ch_name": "遊☆戯☆王ゴーラッシュ！！",
            "ch_icon_url": "https://secure-dcdn.cdn.nimg.jp/comch/channel-icon/64x64/ch2648351.jpg?1727852121"
          }
        }
      } */

      return {
        url: i.watchUrl,
        body: {
          username: d.nicovideo_thumb_response.thumb.ch_name,
          avatar_url: d.nicovideo_thumb_response.thumb.ch_icon_url,
          embeds: [{
            color: 16777215,
            url: i.watchUrl,
            title: i.title,
            description: d.nicovideo_thumb_response.thumb.description,
            thumbnail: {
              url: i.thumbnailUrl,
            },
            timestamp: d.nicovideo_thumb_response.thumb.first_retrieve,
          }]
        } as const satisfies WebhookBody
      }
    }))
  },
})
