import type { Metadata } from "next"
import { Playfair_Display, Instrument_Serif, Krona_One, Inter, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
})

const krona = Krona_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-krona-one",
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

const DESCRIPTION =
  "Exploring the world through people and tech. Ventures, projects, internships and teaching, from Vancouver."

export const metadata: Metadata = {
  /* Absolute base so the generated OG image resolves on shared links rather
     than falling back to localhost. */
  metadataBase: new URL("https://jaredshum.com"),
  title: {
    default: "Jared Shum",
    template: "%s · Jared Shum",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Jared Shum",
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jared Shum",
    description: DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${instrument.variable} ${krona.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="bg-paper text-ink font-sans antialiased">{children}</body>
    </html>
  )
}
