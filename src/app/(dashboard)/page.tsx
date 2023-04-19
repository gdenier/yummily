import { Hydrate, dehydrate } from "@tanstack/react-query"
import { getQueryClient } from "~/lib/utils"
import { Recipes } from "./components/Recipes"
import { fetcher } from "~/lib/api/utils/server/server-fetcher"

export default async function HomePage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    ["recipes"],
    async () => await fetcher("recipes")
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <Recipes />
    </Hydrate>
  )
}

// export default async function HomePage() {
//   const recipes = await fetcher("recipes")
// }
