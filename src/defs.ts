import { hook } from "./utils.ts"
import process from "node:process"
import fs from "node:fs/promises"

export const threads = JSON.parse((await fs.readFile('data/threads.json')).toString()) as {[key: string]: string}
hook.clean.push(async () => {
  await fs.writeFile('data/threads.json', JSON.stringify(threads, null, 2))
})

export const skipAll = process.argv[2] === "skipAll"
