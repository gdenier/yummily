import { ReactNode } from "react"
import { Sidebard } from "./components/Sidebard"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[100dvh] w-screen bg-gray-900 text-slate-50">
      <Sidebard />
      <main className="w-full">{children}</main>
    </div>
  )
}
