import { currentUser } from "@clerk/nextjs/app-beta"
import { User } from "@clerk/nextjs/dist/api"
import { ClockIcon, ImageIcon } from "lucide-react"
import { ReactElement } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent } from "~/components/ui/card"
import { Recipe } from "~/lib/db/schema"

export function RecipeCard({
  recipe,
  user,
}: {
  recipe: Recipe
  user: User | null
}) {
  const totalTime =
    (recipe.preparationTime ?? 0) +
    (recipe.restTime ?? 0) +
    (recipe.bakingTime ?? 0)

  return (
    <Card>
      <CardContent className="flex h-full items-stretch p-0">
        {/* REPLACE BY IMAGE WHEN DONE */}
        <div className="flex h-full w-24 items-center justify-center bg-light-beige">
          <ImageIcon className="h-10 w-10" />
        </div>
        <div className="flex w-full flex-col gap-4 p-6">
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
