import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"

const font = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jared Shum",
  description: "Personal Portfolio",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
