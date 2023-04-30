"use client"

import { ReactElement, useState, useTransition } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { poster } from "~/lib/api/utils/poster"
import { Input } from "~/components/ui/input"
import { RecipeCategory, Unit } from "@prisma/client"
import { CategorySelect } from "./CategorySelect"
import { Ingredients } from "./Ingredients"
import { Steps } from "./Steps"
import { Placeholder } from "~/components/Placeholder"
import { Button } from "~/components/ui/button"
import { CreateRecipeResponse } from "~/pages/api/recipes"

export const createRecipeSchema = z.object({
  title: z.string(),
  persons: z.number().min(0).optional(),
  category: z
    .enum([
      RecipeCategory.appetizer,
      RecipeCategory.main,
      RecipeCategory.dessert,
    ])
    .optional(),
  preparationTime: z.number().min(0).optional(),
  restTime: z.number().min(0).optional(),
  bakingTime: z.number().min(0).optional(),
  ingredients: z.array(
    z.object({
      quantity: z.number(),
      unit: z.enum([
        Unit.centilitre,
        Unit.gram,
        Unit.pinch,
        Unit.raw,
        Unit.tablespoon,
        Unit.teaspoon,
      ]),
      ingredient: z.object({ id: z.string().cuid() }),
    })
  ),
  steps: z.array(
    z.object({
      index: z.number().min(1),
      content: z.string(),
    })
  ),
})

export const CreateRecipeForm = (): ReactElement => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending
  const { getToken } = useAuth()

  const form = useForm<z.infer<typeof createRecipeSchema>>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      ingredients: [],
      steps: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof createRecipeSchema>) => {
    setIsFetching(true)

    const recipe = (await poster(`recipes`, {
      getToken,
      body: values,
    })) as CreateRecipeResponse
    setIsFetching(false)

    startTransition(() => {
      router.push(`/recipes/${recipe.id}`)
    })
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto grid grid-cols-[30%_1fr] gap-4 pt-6"
      >
        <Placeholder />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3">
            <h2 className="text-center">Description</h2>
          </div>
          <div className="col-span-2">
            <Input {...form.register("title")} placeholder="Titre" />
          </div>
          <Input
            {...form.register("persons", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
            })}
            placeholder="Nombre de personnes"
            type="number"
          />
          <div className="col-span-3">
            <CategorySelect />
          </div>
          <Input
            {...form.register("preparationTime", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
            })}
            placeholder="Temps de preparation"
            type="number"
          />
          <Input
            {...form.register("restTime", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
            })}
            placeholder="Temps de pose"
            type="number"
          />
          <Input
            {...form.register("bakingTime", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
            })}
            placeholder="Temps de cuisson"
            type="number"
          />
        </div>
        <div className="col-span-2">
          <Ingredients />
        </div>
        <div className="col-span-2">
          <Steps />
        </div>
        {!isMutating ? <Button type="submit">Envoyer</Button> : "mutating..."}
      </form>
    </FormProvider>
  )
}
