# RSS2Discord

## Memo

https://deno.land/api@v1.32.1?unstable=&s=Deno.Kv

https://deno.land/x/rss@1.0.4

- Rich Site Summary
- RDF Site Summary
- Really Simple Syndication

https://www.thirtyfive.info/entry/2018/07/16/RSS1.0%E3%81%A8RSS2.0%E3%81%AE%E9%81%95%E3%81%84%EF%BC%88%E3%81%96%E3%81%A3%E3%81%8F%E3%82%8A%EF%BC%89

Pythonのfeedparserとかにする?

## TODO

- 定期的にDBクリーン
- 実行ログも飛ばす

https://qiita.com/tippy/items/79ca3f7b7bcac1d92136
https://zenn.dev/snowcait/articles/be718160aa9b2e

## 前のアルゴリズム

```js
/* 新アルゴリズム概要
変数: 新旧KVデータ
KVのデータを全部読み出し → 旧
ループ
  もし url in 旧
    (記事の存在しなかった分を削除する: RSSから溢れいてるため)
    旧.削除(url)
  else
    新[url] = "a"
  ここまで
ここまで

(削除を先にしないと)
KV.削除一括(Object.keys(旧))
KV.一括追加(新)
*/
```

ここにフィードがエラー返した場合の処理がある
