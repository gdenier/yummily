"use client"

import { useQuery } from "@tanstack/react-query"
import { ReactElement } from "react"
import { fetcher } from "~/lib/api/utils/client/client-fetcher"
import { Recipe } from "~/lib/db/schema"

export const Recipes = (): ReactElement => {
  const { data, isLoading, isFetching, isRefetching, refetch } = useQuery<
    Recipe[]
  >({
    queryKey: ["recipes"],
    queryFn: async () => await fetcher("recipes"),
  })

  if (isLoading || isFetching) return <p>Loading...</p>

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

      <button
        onClick={() => {
          refetch()
        }}
      >
        Refetch
      </button>
    </>
  )
}
