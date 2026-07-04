import Masthead from "./components/Masthead"
import Hero from "./components/Hero"
import FeaturedSickNote from "./components/FeaturedSickNote"
import NextTeaser from "./components/NextTeaser"
import IndexTable from "./components/IndexTable"

export default function Home() {
  return (
    <main>
      <Masthead />
      <Hero />
      <FeaturedSickNote />
      <NextTeaser />
      <IndexTable />
    </main>
  )
}
