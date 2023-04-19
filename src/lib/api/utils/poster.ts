import { PosterOptions } from "./domain/types"

export async function poster(path: string, options: PosterOptions) {
  const headers = new Headers()
  const token = await options.getToken()
  if (!token) throw new Error("Can't call protected route")
  headers.append("Authorization", token)
  return await (
    await fetch(`http://localhost:3006/api/${path}`, {
      next: { revalidate: 0 },
      method: "POST",
      headers,
      body: JSON.stringify(options.body),
    })
  ).json()
}
