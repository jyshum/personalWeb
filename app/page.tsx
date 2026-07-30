import Masthead from "./components/Masthead"
import Hero from "./components/Hero"
import Recently from "./components/Recently"
import VictoryVelocity from "./components/VictoryVelocity"
import About from "./components/About"
import FeaturedSickNote from "./components/FeaturedSickNote"
import ContactFooter from "./components/ContactFooter"

export default function Home() {
  return (
    <main>
      <Masthead />
      <Hero />
      <Recently />
      <VictoryVelocity />
      <About />
      <FeaturedSickNote />
      <ContactFooter />
    </main>
  )
}
