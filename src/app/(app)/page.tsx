import { fetcher } from "~/lib/api/utils/server/server-fetcher"
import { Button } from "~/components/ui/button"
import Image from "next/image"
import { currentUser } from "@clerk/nextjs/app-beta"
import { RecipeSearchbar } from "./RecipeSearchbar"
import { RecipeList } from "./RecipeList"
import { GetManyRecipeResponse } from "~/pages/api/recipes"

export default async function HomePage() {
  const recipes = (await fetcher("recipes")) as GetManyRecipeResponse

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
          <RecipeSearchbar />
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
      <RecipeList recipes={recipes} />
    </div>
  )
}
