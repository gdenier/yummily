"use client"

import { useOrganizationList, useOrganization } from "@clerk/nextjs"
import { ReactElement } from "react"

export const OrganizationsList = (): ReactElement => {
  const { organizationList, isLoaded } = useOrganizationList()

  if (!isLoaded) return <p>Loading...</p>

  if (!organizationList.length) return <p>No organization</p>

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">Nom de l&apos;organisation</p>
        <p>Nombre de membre</p>
        <p className="text-right text-sm font-bold">Actions</p>
      </div>
      <ul className="flex flex-col divide-y divide-gray-800">
        {organizationList.map((org) => (
          <li
            key={org.organization.id}
            className="flex items-center justify-between py-2"
          >
            <p>{org.organization.name}</p>
            <p>{org.organization.membersCount}</p>
            <div className="flex gap-1">
              <button
                className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                onClick={() => {
                  org.organization.inviteMember({
                    emailAddress: "yaouea@gmail.com",
                    role: "basic_member",
                  })
                }}
              >
                Inviter
              </button>
              <button
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                onClick={async () => {
                  await org.organization.destroy()
                }}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
