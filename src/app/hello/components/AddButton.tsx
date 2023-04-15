"use client"

import { useRouter } from "next/navigation"
import { ReactElement, useState, useTransition } from "react"

export const AddButton = (): ReactElement => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending

  const handleAdd = async () => {
    setIsFetching(true)
    await fetch(`http://localhost:3006/api/hello`, {
      method: "POST",
      body: JSON.stringify({ title: "Hello From Next.js" }),
    })
    setIsFetching(false)

    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route
      // - Re-fetches data requests and re-renders Server Components
      // - Sends the updated React Server Component payload to the client
      // - The client merges the payload without losing unaffected
      //   client-side React state or browser state
      router.refresh()

      // Note: If fetch requests are cached, the updated data will
      // produce the same result.
    })
  }

  return (
    <>
      <button onClick={handleAdd}>Add Hello</button>
      {isMutating ? <p>Mutating...</p> : null}
    </>
  )
}
