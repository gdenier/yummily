import { Hydrate, dehydrate } from "@tanstack/react-query"
import { getQueryClient } from "~/lib/utils"
import { Recipes } from "./components/Recipes"
import { fetcher } from "~/lib/api/utils/server/server-fetcher"

export default async function HomePage() {
  const recipes = await fetcher("recipes")

  return <Recipes data={recipes} />
}
