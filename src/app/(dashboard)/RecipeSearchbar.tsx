"use client"

import { SearchIcon } from "lucide-react"
import { ReactElement } from "react"
import { Input } from "~/components/ui/input"
import { useRecipesStore } from "./useRecipes"

export const RecipeSearchbar = (): ReactElement => {
  const setSearch = useRecipesStore((state) => state.setSearch)

  return (
    <div className="z-10 flex w-full items-center gap-2 rounded-md bg-white pr-3 shadow-down">
      <Input
        type="search"
        placeholder="Tarte, risotto, salade..."
        className="border-none"
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchIcon />
    </div>
  )
}
