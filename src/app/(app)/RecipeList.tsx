"use client"

import { ImageIcon, ClockIcon } from "lucide-react"
import { ReactElement, useEffect } from "react"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent } from "~/components/ui/card"
import { useRecipes, useRecipesStore } from "./useRecipes"
import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Recipe } from "@prisma/client"

export const RecipeList = ({
  recipes: initialData,
}: {
  recipes: Recipe[]
}): ReactElement => {
  const { appendRecipes } = useRecipesStore()
  const recipes = useRecipes()

  useEffect(() => {
    appendRecipes(initialData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container mx-auto mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

const RecipeCard = ({ recipe }: { recipe: Recipe }): ReactElement => {
  const { user } = useUser()

  const totalTime =
    (recipe.preparationTime ?? 0) +
    (recipe.restTime ?? 0) +
    (recipe.bakingTime ?? 0)

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex h-full w-full p-0">
        {/* REPLACE BY IMAGE WHEN DONE */}
        <div className="flex h-full w-1/3 items-center justify-center bg-light-beige">
          <ImageIcon className="h-10 w-10" />
        </div>
        <div className="flex w-2/3 flex-col gap-4 p-6">
          <p>{recipe.title}</p>
          <div className="flex items-center justify-between">
            <Badge>Plat</Badge>
            <div className="flex gap-1">
              <ClockIcon />
              <p>{totalTime}min</p>
            </div>
            <Avatar>
              <AvatarImage src={user?.profileImageUrl} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
