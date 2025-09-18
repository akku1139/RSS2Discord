import { makePlugin } from "../utils.ts"

// simple hash by gemini 2.5 flash
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    // 32ビット整数に収めるためのビット演算
    hash |= 0;
  }
  // 結果を36進数に変換し、文字列として返す
  // 10文字程度に短縮したい場合は、ここで substring を使う
  return (hash >>> 0).toString(36).substring(0, 10);
}

export const linuxReleaseID = makePlugin({
  transformer: {
    url: (link, e) => {
      return link + "#" + simpleHash(e?.title?.value)
    }
  }
})
