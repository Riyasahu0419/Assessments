import Navbar from './Navbar'
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--color-darker)' }}>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}
