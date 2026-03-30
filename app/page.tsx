import Hero from "./components/Hero"
import TopBar from "./components/TopBar"
import SectionGrid from "./components/SectionGrid"
import AccentStrip from "./components/AccentStrip"

export default function Home() {
  return (
    <main>
      <TopBar />
      <Hero />
      <AccentStrip />
      <div style={{ backgroundColor: "#F0EFEC" }}>
        <SectionGrid />
      </div>
    </main>
  )
}
