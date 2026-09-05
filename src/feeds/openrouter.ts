import { makeFeeds, getEnv } from "../utils.ts"

const OPENROUTER_WEBHOOK_URL = getEnv("OPENROUTER_WEBHOOK_URL")

export default makeFeeds([{
  name: "OpenRouter",
  url: "https://openrouter.ai/api/v1/models?limit=50&use_rss=true&sort=newest",
  icon: "https://openrouter.ai/apple-touch-icon.png",
  test: true,
//   webhook: OPENROUTER_WEBHOOK_URL,
}]);
