import { FormattedFeed } from "./feeds.ts";
import { log, sleep, hook } from "./utils.ts"

const threads = JSON.parse(await Deno.readTextFile('data/threads.json')) as {[key: string]: string}
hook.clean.push(async () => {
  await Deno.writeTextFile('data/threads.json', JSON.stringify(threads, null, 2))
})

const FORUM_WEBHOOK_URL = Deno.env.get("FORUM_WEBHOOK_URL") ?? ""
if(FORUM_WEBHOOK_URL === "") {
  throw new Error("Env FORUM_WEBHOOK_URL is not set.")
}

const responseStatus = {
  error: 0
}
hook.clean.push(() => {
  log.info("WebHook status", responseStatus)
})

const webhook = async (url: string, body: any, ok: Function, onFetchError: Function, onHTTPError: Function) => {
  let retryCount = 0
  let error: boolean = false
  let r: Response = new Response("Fake body")
  while(true) {
    try {
      r = await fetch(url, {
        method: "POST",
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(body)
      })
    } catch(e) {
      onFetchError(e)
      responseStatus["error"] ++
      error = true
      break
    }

    responseStatus[r.status]  = (responseStatus[r.status] ?? 0) + 1

    if(r.ok) {
      ok(r)
      break
    } else if(retryCount > 5) {
      log.warn(url, "Exceeded maximum retry count")
      error = true
      break
    } else if(r.status === 400) {
      onHTTPError("400 Bad Request", await r.text())
      error = true
      break
      /* if(ratelimit === null) {
        break
      } else {
        await sleep(Number(ratelimit))
        retryCount ++
        continue
      } */
    } else if(r.status === 429) {
      await sleep((await r.json()).retry_after)
      retryCount ++
      continue
    } else if(r.status === 500) {
      // const ratelimit = r.headers.get("x-ratelimit-reset-after")
      onHTTPError("500 Internal Server Error", await r.text())
      error = true
      break
      /* if(ratelimit === null) {
        break
      } else {
        await sleep(Number(ratelimit))
        retryCount ++
        continue
      } */
    } else {
      onHTTPError(`${r.status}`, await r.text())
      error = true
      break
    }
  }
  return {
    r, error
  }
}

export const sendWebHook = async (url: string, body: any, feed: FormattedFeed, db: {[key: string]: "a"}) => {
  if(feed.test === true) {
    return await webhook(
      url, body,
      () => { db[url] = "a" },
      (s, t) => log.error("on webhook: ", feed.name, url, s, t),
      (s, t) => log.error(s, feed.name, url, t, body),
    )
  }

  let threadID: string
  if(feed.base in threads) {
    threadID = threads[feed.base]
  } else {
    const raw = await webhook(
      FORUM_WEBHOOK_URL+"?wait=true", {
        thread_name: feed.threadName,
        content: feed.description,
        username: feed.name,
        avatar_url: feed.icon,
      },
      () => { },
      (s, t) => log.error("on webhook (create thread): ", feed.name, url, s, t),
      (s, t) => log.error(s, "(create thread)", feed.name, url, t, body),
    )
    if(raw.error === true) {
      log.warn(url, "was not be sent because the thread could not be created.")
      return raw
    }
    const res = await raw.r.json()
    threadID = res.channel_id
    threads[feed.base] = threadID
  }

  return await webhook(
    `${FORUM_WEBHOOK_URL}?thread_id=${threadID}`, body,
    () => { db[url] = "a" },
    (s, t) => log.error("on webhook (forum): ", feed.name, url, s, t),
    (s, t) => log.error(s, "(forum)", feed.name, url, t, body),
  )
}
