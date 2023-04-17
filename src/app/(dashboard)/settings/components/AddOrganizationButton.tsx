"use client"

import { useOrganizations } from "@clerk/nextjs"
import { ReactElement } from "react"

export const AddOrganizationButton = (): ReactElement => {
  const { createOrganization } = useOrganizations()

  const handleClick = async () => {
    try {
      await createOrganization?.({
        name: "Organization n." + Math.floor(Math.random() * 100),
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <button
      className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      onClick={handleClick}
    >
      Ajouter
    </button>
  )
}
