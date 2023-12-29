import { Montserrat } from "next/font/google"
import type { Metadata } from "next"
import "@/styles/globals.css"
import { AuthProvider } from "@/contexts/AuthProvider"
import { MainLayout } from "@/components/ui"
import { IChildren } from "@/types"

const montserrat = Montserrat({
  weight: ["400", "600", "700"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Movie App",
  description: "Explore and enjoy a world of movies."
}

export default function RootLayout({ children }: IChildren) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
