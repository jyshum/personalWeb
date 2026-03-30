import Hero from "./components/Hero"
import TopBar from "./components/TopBar"
import SectionGrid from "./components/SectionGrid"

export default function Home() {
  return (
    <main>
      <TopBar />
      <Hero />
      <SectionGrid />
    </main>
  )
}