import { fetcher } from "~/lib/api/utils/server/server-fetcher"
import { Input } from "~/components/ui/input"
import { SearchIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import Image from "next/image"
import { RecipeCard } from "./RecipeCard"
import { Recipe } from "~/lib/db/schema"
import { currentUser } from "@clerk/nextjs/app-beta"

export default async function HomePage() {
  const recipes = (await fetcher("recipes")) as Recipe[]
  const user = await currentUser()

  const dayMoment = (() => {
    const hour = new Date().getHours()
    if (hour >= 15) return "diner"
    if (hour >= 10) return "dejeuner"
    return "petit dejeuner"
  })()

  return (
    <div>
      <div className="bg-light-beige py-16">
        <div className="container relative mx-auto flex w-9/12 flex-col items-center gap-6">
          <h2 className="z-10 font-serif text-2xl">
            Qu’aimeriez vous préparer pour le {dayMoment} ?
          </h2>
          <div className="z-10 flex w-full items-center gap-2 rounded-md bg-white pr-3 shadow-down">
            <Input
              type="search"
              placeholder="Tarte, risotto, salade..."
              className="border-none "
            />
            <SearchIcon />
          </div>
          <div className="z-10 flex gap-4">
            <Button variant="outline">
              Entrées
              <span className="ml-2 text-xs text-dark-70">25 recettes</span>
            </Button>
            <Button variant="outline">
              Plats
              <span className="ml-2 text-xs text-dark-70">34 recettes</span>
            </Button>
            <Button variant="outline">
              Desserts
              <span className="ml-2 text-xs text-dark-70">18 recettes</span>
            </Button>
          </div>
          <Image
            className="absolute -right-16 bottom-0 top-0 z-0 my-auto"
            src="/img/illustrations/recipe-book.svg"
            alt="illustration of an orange recipe book"
            width={224}
            height={227}
          />
        </div>
      </div>
      <div className="container mx-auto mt-8 grid w-full grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} user={user} />
        ))}
      </div>
    </div>
  )
}
