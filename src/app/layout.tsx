import { ClerkProvider } from "@clerk/nextjs/app-beta"
import "~/styles/globals.css"
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
    <html
      lang="fr"
      className={`${poppins.variable} ${sourceSansPro.variable} ${YesevaOne.variable}`}
    >
      <ClerkProvider>
        <body>{children}</body>
      </ClerkProvider>
    </html>
  )
}
