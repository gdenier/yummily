import { PlusSquareIcon, SettingsIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import { ReactElement } from "react"
import { Logo } from "~/components/Logo"

export const TopMenu = (): ReactElement => {
  return (
    <div className="bg-light-beige py-8">
      <nav className=" container mx-auto flex w-full items-center justify-between">
        <Logo />
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="flex gap-2 text-dark">
              <PlusSquareIcon />
              Ajouter une recette
            </Link>
          </li>
          <li>
            <Link href="/" className="flex gap-2 text-dark">
              <UsersIcon />
              Mes groupes
            </Link>
          </li>
          <li>
            <Link href="/" className="flex gap-2 text-dark">
              <SettingsIcon />
              Mes paramètres
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
