import { QueryClient } from "@tanstack/react-query"
import { cache } from "react"

export const getQueryClient = cache(() => new QueryClient())

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return "" // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3006}` // dev SSR should use localhost
}
