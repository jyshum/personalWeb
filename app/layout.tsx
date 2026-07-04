import type { Metadata } from "next"
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
})

export const metadata: Metadata = {
  title: "Jared Shum — ML & full-stack builder",
  description:
    "Jared Shum builds ML systems and web products. Vancouver, BC — UBC Sauder BUCS, Class of 2030.",
  openGraph: {
    title: "Jared Shum — ML & full-stack builder",
    description:
      "I love building ML systems and impactful products. Vancouver, BC — UBC Sauder BUCS, Class of 2030.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Jared Shum — portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jared Shum — ML & full-stack builder",
    description:
      "I love building ML systems and impactful products. Vancouver, BC — UBC Sauder BUCS, Class of 2030.",
    images: ["/og.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="bg-paper text-ink font-sans antialiased">{children}</body>
    </html>
  )
}
