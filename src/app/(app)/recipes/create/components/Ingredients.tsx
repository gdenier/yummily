"use client"

import { ReactElement, useEffect } from "react"
import {
  Controller,
  UseFieldArrayRemove,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form"
import { z } from "zod"
import { createRecipeSchema } from "./CreateRecipeForm"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { TrashIcon } from "lucide-react"
import { Unit } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

export const Ingredients = (): ReactElement => {
  const form = useFormContext<z.infer<typeof createRecipeSchema>>()
  const fieldArray = useFieldArray({
    control: form.control,
    name: "ingredients",
  })

  const values = useWatch()
  useEffect(() => console.log(values), [values])

  return (
    <div>
      {fieldArray.fields.map((field, index) => (
        <IngredientFormRow
          key={field.id}
          index={index}
          remove={fieldArray.remove}
        />
      ))}
      <Button
        onClick={() =>
          fieldArray.append({
            name: null as unknown as string,
            quantity: null as unknown as number,
            unit: null as unknown as Unit,
          })
        }
      >
        Ajouter un ingredient
      </Button>
    </div>
  )
}

const unitParser: { [Key in Unit]: { name: string } } = {
  gram: { name: "gramme" },
  centilitre: { name: "centilitre" },
  tablespoon: { name: "cuilliere a soupe" },
  teaspoon: { name: "cuilliere a cafe" },
  pinch: { name: "pincee" },
  raw: { name: "unite" },
}

const IngredientFormRow = ({
  index,
  remove,
}: {
  index: number
  remove: UseFieldArrayRemove
}) => {
  const form = useFormContext<z.infer<typeof createRecipeSchema>>()
  return (
    <div className="flex gap-4">
      <Input
        {...form.register(`ingredients.${index}.quantity`, {
          setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
        })}
        placeholder="Unité"
        className="w-28"
        type="number"
      />
      <Controller
        control={form.control}
        name={`ingredients.${index}.unit`}
        render={({ field }) => (
          <Select onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Mesure" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(Unit).map((unit) => (
                <SelectItem value={unit} key={`unit-${unit}-${index}`}>
                  {unitParser[unit as Unit].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <Input
        {...form.register(`ingredients.${index}.name`)}
        placeholder="ingredient"
      />
      <Button variant="destructive" onClick={() => remove(index)}>
        <TrashIcon />
      </Button>
    </div>
  )
}
