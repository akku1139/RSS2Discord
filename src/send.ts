import { WebhookBody, type FormattedFeed } from "./types.ts";
import { log, sleep, hook, getEnv } from "./utils.ts"
import { threads, skipAll } from "./defs.ts"

const FORUM_WEBHOOK_URL = getEnv("FORUM_WEBHOOK_URL")

const responseStatus: {
  [T in "error" | number]: number
} = {
  error: 0
}
hook.clean.push(() => {
  log.info("WebHook status", responseStatus)
})

const webhook = async (
  url: string, body: unknown,
  ok: (response: Response) => void = () => {},
  onFetchError: (error: unknown) => void = log.error,
  onHTTPError: (httpStatus: string, body: string) => void = log.error
) => {
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

    responseStatus[r.status] = (responseStatus[r.status] ?? 0) + 1

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

export const sendWebhook = async (
  url: string,
  body: WebhookBody,
  feed: FormattedFeed,
  db: {[key: string]: "a"}
) => {
  if(skipAll) {
    return {
      r: new Response("fake"),
      error: false
    }
  }

  if(feed.test === true) {
    return await webhook(
      feed.webhook, body,
      () => { db[url] = "a" },
      (s) => log.error("on webhook: ", feed.name, url, s),
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
      (s) => log.error("on webhook (create thread): ", feed.name, url, s),
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
    (s) => log.error("on webhook (forum): ", feed.name, url, s),
    (s, t) => log.error(s, "(forum)", feed.name, url, t, body),
  )
}
