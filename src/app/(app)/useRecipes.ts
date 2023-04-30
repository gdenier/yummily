"use client"

import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import Fuse from "fuse.js"
import { useMemo } from "react"
import { Recipe } from "@prisma/client"

interface RecipesState {
  recipes: Recipe[]
  filters: {
    search?: string
  }
}

interface RecipesActions {
  appendRecipes: (newRecipes: Recipe[]) => void
  setSearch: (search: string) => void
  clearSearch: () => void
}

export const useRecipesStore = create(
  immer<RecipesState & RecipesActions>((set) => ({
    recipes: [],
    filters: {},
    appendRecipes(newRecipes) {
      set((state) => {
        state.recipes.push(...newRecipes)
        state.recipes = state.recipes.filter(function (
          this: Set<string>,
          { id }
        ) {
          return !this.has(id) && this.add(id)
        },
        new Set())
      })
    },
    setSearch(search) {
      set((state) => {
        state.filters.search = search
      })
    },
    clearSearch() {
      set((state) => {
        state.filters.search = undefined
      })
    },
  }))
)

export const useRecipes = () => {
  const recipes = useRecipesStore((state) => state.recipes)
  const filters = useRecipesStore((state) => state.filters)

  const dict = useMemo(
    () =>
      new Fuse(recipes, {
        keys: ["title"],
      }),
    [recipes]
  )
  return useMemo(
    () =>
      [
        ...(filters.search
          ? dict.search(filters.search).map((e) => e.item)
          : recipes),
      ].sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : b.title.toLowerCase() > a.title.toLowerCase()
          ? -1
          : 0
      ),
    [dict, filters.search, recipes]
  )
}
