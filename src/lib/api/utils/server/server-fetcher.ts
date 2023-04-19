import { auth } from "@clerk/nextjs/app-beta"
import { FetcherOptions, HTTPVerb } from "../domain/types"

export async function fetcher(path: string, options?: FetcherOptions) {
  const headers = new Headers()
  if (!options?.public) {
    const { getToken } = auth()
    const token = await getToken()
    if (!token) throw new Error("Can't call protected route")
    headers.append("Authorization", token)
  }
  return await (
    await fetch(`http://localhost:3006/api/${path}`, {
      next: { revalidate: 0 },
      method: options?.method ?? "GET",
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })
  ).json()
}
