import { AddButton } from "./components/AddButton"
import { SignOutButton } from "~/components/auth/SignOutButton"

export default async function HelloPage() {
  return (
    <div className="flex flex-col">
      {[]?.map((hello: any) => (
        <p key={hello.id}>{hello.title}</p>
      ))}
      <AddButton />
      <SignOutButton />
    </div>
  )
}
