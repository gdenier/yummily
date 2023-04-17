"use client"

import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { ReactElement } from "react"

export const SignOutButton = (): ReactElement => {
  const { signOut } = useClerk()
  const router = useRouter()
  const handleClick = async () => {
    await signOut()
    router.push("/sign-in")
  }
  return (
    <button
      onClick={() => (console.log("test"), handleClick())}
      className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Sign out
    </button>
  )
}
