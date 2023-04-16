"use client"

import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { ReactElement, useState, useTransition } from "react"
import { poster } from "~/lib/api/utils/poster"

export const AddButton = (): ReactElement => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending

  const { user } = useUser()
  const { getToken } = useAuth()

  const handleAdd = async () => {
    setIsFetching(true)

    await poster(`hello`, {
      getToken,
      body: { title: `Hello from ${user?.id}` },
    })
    setIsFetching(false)

    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <>
      <button onClick={handleAdd}>Add Hello</button>
      {isMutating ? <p>Mutating...</p> : null}
    </>
  )
}
