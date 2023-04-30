import { ReactNode } from "react"
import { TopMenu } from "~/components/TopMenu"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[100dvh] w-screen flex-col text-foreground">
      <TopMenu />
      <main>{children}</main>
    </div>
  )
}
