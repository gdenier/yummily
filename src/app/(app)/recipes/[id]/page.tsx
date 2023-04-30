import { fetcher } from "~/lib/api/utils/server/server-fetcher"
import { GetRecipeResponse } from "~/pages/api/recipes/[id]"

export const revalidate = 0

export default async function RecipeShowPage({
  params,
}: {
  params: { id: string }
}) {
  const recipe = (await fetcher(`recipes/${params.id}`)) as GetRecipeResponse
  return <h2>{recipe.title}</h2>
}
