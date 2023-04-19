"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactElement, useState } from "react"

export const Providers = ({ children }: PropsWithChildren): ReactElement => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
