import { AddButton } from "./components/AddButton"
import { fetcher } from "~/lib/api/utils/fetcher"

export default async function HelloPage() {
  const hellos = await fetcher("hello")

  return (
    <div>
      {hellos?.map((hello: any) => (
        <p key={hello.id}>{hello.title}</p>
      ))}
      <AddButton />
    </div>
  )
}
