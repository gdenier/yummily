"use client"

import { Unit } from "@prisma/client"
import { TrashIcon } from "lucide-react"
import { ReactElement, useEffect } from "react"
import {
  useFormContext,
  useFieldArray,
  useWatch,
  UseFieldArrayRemove,
} from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import { createRecipeSchema } from "./CreateRecipeForm"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"

export const Steps = (): ReactElement => {
  const form = useFormContext<z.infer<typeof createRecipeSchema>>()
  const fieldArray = useFieldArray({
    control: form.control,
    name: "steps",
  })

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
            index: fieldArray.fields.length + 1,
            content: null as unknown as string,
          })
        }
      >
        Ajouter une etape
      </Button>
    </div>
  )
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
      <div className="flex aspect-square h-8 items-center justify-center rounded-full bg-orange font-serif text-xl">
        <p>{index + 1}</p>
      </div>
      <Textarea
        {...form.register(`steps.${index}.content`)}
        placeholder="Etape"
      />
      <Button variant="destructive" onClick={() => remove(index)}>
        <TrashIcon />
      </Button>
    </div>
  )
}
