import { OrganizationsList } from "./components/OrganizationsList"
import { AddOrganizationButton } from "./components/AddOrganizationButton"
import { SignOutButton } from "~/components/auth/SignOutButton"

export default function SettingsPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 py-6">
      <h2 className="text-xl font-bold">Settings</h2>
      <section className="w-full border-t-2 border-gray-700 py-4">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-lg font-bold">Groupe</h3>
          <AddOrganizationButton />
        </div>
        <OrganizationsList />
      </section>
      <section className="w-full border-t-2 border-gray-700 py-4 text-red-600">
        <div className="flex w-full items-center justify-between ">
          <h3 className="text-lg font-bold">Danger Zone</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>Se deconnecter</p>
          <SignOutButton />
        </div>
      </section>
    </div>
  )
}
