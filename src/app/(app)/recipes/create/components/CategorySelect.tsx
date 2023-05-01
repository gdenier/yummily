"use client"

import { RecipeCategory, Unit } from "@prisma/client"
import { ReactElement, ReactNode } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { z } from "zod"
import { createRecipeSchema } from "./CreateRecipeForm"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Label } from "~/components/ui/label"
import { buttonVariants } from "~/components/ui/button"
import { IceCream2Icon, Icon, SaladIcon, SoupIcon } from "lucide-react"
import { cn } from "~/lib/utils"

const categoryParser: {
  [Key in RecipeCategory]: { name: string; icon: ReactNode }
} = {
  appetizer: { name: "entree", icon: <SaladIcon /> },
  main: { name: "plat", icon: <SoupIcon /> },
  dessert: { name: "dessert", icon: <IceCream2Icon /> },
}

export const CategorySelect = (): ReactElement => {
  const form = useFormContext<z.infer<typeof createRecipeSchema>>()

  return (
    <Controller
      control={form.control}
      name="category"
      render={({ field }) => (
        <RadioGroup
          onValueChange={field.onChange}
          className="flex w-full justify-between"
        >
          {Object.keys(RecipeCategory).map((category) => (
            <div key={category} className="w-full">
              <RadioGroupItem
                value={category}
                id={category}
                className="hidden"
              />
              <Label
                htmlFor={category}
                className={buttonVariants({
                  variant: "outline",
                  className: cn(
                    "w-full gap-2",
                    field.value === category
                      ? "bg-red-500 hover:bg-red-700"
                      : undefined
                  ),
                })}
              >
                {categoryParser[category as RecipeCategory].icon}
                {categoryParser[category as RecipeCategory].name}
              </Label>
            </div>
          ))}
        </RadioGroup>
        // <Select onValueChange={field.onChange}>
        //   <SelectTrigger>
        //     <SelectValue placeholder="Categorie" />
        //   </SelectTrigger>
        //   <SelectContent>
        //     {Object.keys(RecipeCategory).map((category) => (
        //       <SelectItem value={category} key={`category-${category}`}>
        //         {categoryParser[category as RecipeCategory].name}
        //       </SelectItem>
        //     ))}
        //   </SelectContent>
        // </Select>
      )}
    />
  )
}
