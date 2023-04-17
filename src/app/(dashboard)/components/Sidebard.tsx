import Link from "next/link"
import { ReactElement } from "react"

export const Sidebard = (): ReactElement => {
  return (
    <div className="h-[100dvh] w-52 border-r-2 border-gray-800 px-2 py-12">
      <div className="pb-12">
        <h1 className="text-center text-2xl font-bold">App Title</h1>
      </div>

      <ul className="flex w-full flex-col gap-4">
        <li>
          <Link
            href="/"
            className="block w-full rounded bg-gray-950 p-2 font-semibold hover:bg-gray-800"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="block w-full rounded bg-gray-950 p-2 font-semibold hover:bg-gray-800"
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  )
}
