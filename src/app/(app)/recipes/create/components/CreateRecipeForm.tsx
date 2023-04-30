"use client"

import { ReactElement, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { poster } from "~/lib/api/utils/poster"

export const createRecipeSchema = z.object({
  title: z.string(),
})

export const CreateRecipeForm = (): ReactElement => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending
  const { getToken } = useAuth()

  const form = useForm<z.infer<typeof createRecipeSchema>>({
    resolver: zodResolver(createRecipeSchema),
  })

  const onSubmit = async (values: z.infer<typeof createRecipeSchema>) => {
    setIsFetching(true)

    await poster(`recipes`, {
      getToken,
      body: values,
    })
    setIsFetching(false)

    startTransition(() => {
      router.push("/")
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("title")} />
      <input type="submit" />
    </form>
  )
}
