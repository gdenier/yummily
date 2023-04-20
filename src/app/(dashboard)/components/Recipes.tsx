import { useQuery } from "@tanstack/react-query"
import { ReactElement } from "react"
import { fetcher } from "~/lib/api/utils/client/client-fetcher"
import { Recipe } from "~/lib/db/schema"

export const Recipes = ({ data }: { data: Recipe[] }): ReactElement => {
  return (
    <>
      <p>Recipes</p>
      <ul>
        {data?.map((recipe) => (
          <li key={recipe.id}>
            <p>{recipe.title}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
