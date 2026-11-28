import type { Builder } from "../types.ts"
import { makeFeeds } from "../utils.ts"

const catalogBuilder: (modelId2URL: (id: string) => string) => Builder = (modelId2URL) => async (feed) => {
  const models = await (await feed.res).json() as {
    data: Array<{
      id: string,
      name: string,
      created: number,
      context_length: number,
      description?: string,
      architecture?: {
        modality?: string,
      }
    }>
  }

  return models.data.map(m => ({
    url: "modelCatalog:" + modelId2URL(m.id),
    body: () => ({
      username: feed.name,
      avatar_url: feed.icon,
      content: modelId2URL(m.id),
    }),
  }))
}

export default makeFeeds({
  name: "Command Code",
  url: "https://api.commandcode.ai/provider/v1/models",
  icon: "https://avatars.githubusercontent.com/u/151507869?s=200&v=4",
  builder: catalogBuilder(
    id => "https://commandcode.ai/models/" + id.replace(/^[^/]+\//, "") // スラッシュ以前を削除
      .replace(/[.:]/g, '-') // ドットとコロンをハイフンに置換),
      .toLowerCase()
  ),
}, {
  name: "OpenRouter",
  url: "https://openrouter.ai/api/v1/models",
  icon: "https://openrouter.ai/apple-touch-icon.png",
  builder: catalogBuilder(
    id => "https://openrouter.ai/" + id,
  ),
}, {
  name: "Vercel AI Gateway",
  url: "https://ai-gateway.vercel.sh/v1/models",
  icon: "https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/apple-touch-icon-256x256.png",
  builder: catalogBuilder(
    id => "https://vercel.com/ai-gateway/models/" + id,
  ),
}, {
  name: "OrcaRouter",
  url: "https://www.orcarouter.ai/api/v1/models",
  icon: "https://www.orcarouter.ai/orca-logo-classic.png",
  builder: catalogBuilder(
    id => "https://www.orcarouter.ai/models/" + id,
  ),
})
