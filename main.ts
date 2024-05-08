import feeds from "./feeds.ts";

const kv = await Deno.openKv("db/main.db");


await kv.close();
