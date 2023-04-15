import { AddButton } from "./components/AddButton"

async function getHello() {
  return await (
    await fetch(`http://localhost:3006/api/hello`, { next: { revalidate: 0 } })
  ).json()
}

export default async function HelloPage() {
  const { hellos } = await getHello()

  return (
    <div>
      {hellos.map((hello: any) => (
        <p key={hello.id}>{hello.title}</p>
      ))}
      <AddButton />
    </div>
  )
}
