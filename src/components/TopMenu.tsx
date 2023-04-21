import { PlusSquareIcon, SettingsIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import { ReactElement } from "react"
import { Logo } from "~/components/Logo"
import { buttonVariants } from "~/components/ui/button"

export const TopMenu = (): ReactElement => {
  return (
    <div className="bg-light-beige py-4">
      <nav className=" container mx-auto flex w-full items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link href="/" className={buttonVariants({ variant: "link" })}>
              <PlusSquareIcon className="mr-2" />
              Ajouter une recette
            </Link>
          </li>
          <li>
            <Link href="/" className={buttonVariants({ variant: "link" })}>
              <UsersIcon className="mr-2" />
              Mes groupes
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={buttonVariants({ variant: "link" })}
            >
              <SettingsIcon className="mr-2" />
              Mes paramètres
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
