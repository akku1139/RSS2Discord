import { hook } from "./utils.ts"

export const threads = JSON.parse(await Deno.readTextFile('data/threads.json')) as {[key: string]: string}
hook.clean.push(async () => {
  await Deno.writeTextFile('data/threads.json', JSON.stringify(threads, null, 2))
})

export const skipAll = Deno.args[0] === "skipAll"
