import feeds from "./feeds.ts";

const kv = await Deno.openKv("db/main.db");

let rateLimited = 0;


await kv.close();
