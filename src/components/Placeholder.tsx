import { ImageIcon } from "lucide-react"
import { ReactElement } from "react"

export const Placeholder = (): ReactElement => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-light-beige">
      <ImageIcon className="h-10 w-10" />
    </div>
  )
}
