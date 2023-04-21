import { ClerkProvider } from "@clerk/nextjs/app-beta"
import "~/styles/globals.css"
import { Providers } from "./Providers"
import { Poppins, Source_Sans_Pro, Yeseva_One } from "next/font/google"

const poppins = Poppins({
  variable: "--poppins-font",
  weight: "400",
  subsets: ["latin"],
})
const sourceSansPro = Source_Sans_Pro({
  variable: "--source-font",
  weight: "400",
  subsets: ["latin"],
})
const YesevaOne = Yeseva_One({
  variable: "--yeseva-font",
  weight: "400",
  subsets: ["latin"],
})

export const metadata = {
  title: "Yummily",
  description: "The Family recipe book for yummi dishes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html
        lang="fr"
        className={`font-sans ${poppins.variable} ${sourceSansPro.variable} ${YesevaOne.variable}`}
      >
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
