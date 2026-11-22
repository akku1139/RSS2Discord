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
    url: modelId2URL(m.id),
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
})
