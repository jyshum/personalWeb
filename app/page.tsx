import Masthead from "./components/Masthead"
import Hero from "./components/Hero"
import FeaturedSickNote from "./components/FeaturedSickNote"
import NextTeaser from "./components/NextTeaser"
import IndexTable from "./components/IndexTable"
import About from "./components/About"

export default function Home() {
  return (
    <main>
      <Masthead />
      <Hero />
      <FeaturedSickNote />
      <NextTeaser />
      <IndexTable />
      <About />
    </main>
  )
}
