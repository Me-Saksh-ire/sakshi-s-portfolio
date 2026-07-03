import { useEffect, useState } from 'react'
import { spawnShockwave } from './utils/shockwave'
import CursedField from './components/CursedField'
import CursorEmber from './components/CursorEmber'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [reduced, setReduced] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchQuery = window.matchMedia('(hover: none)')
    setReduced(motionQuery.matches)
    setIsTouch(touchQuery.matches || window.innerWidth < 900)

    if (touchQuery.matches || window.innerWidth < 900) {
      document.body.classList.add('touch-device')
    }
  }, [])

  useEffect(() => {
    if (reduced) return
    const onClick = (e) => {
      const color = Math.random() > 0.5 ? '#1be996' : '#ff3b52'
      spawnShockwave(e.clientX, e.clientY, color)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [reduced])

  return (
    <>
      <CursedField reduced={reduced} />
      <CursorEmber reduced={reduced} isTouch={isTouch} />
      <div className="grain" />

      <Nav />
      <main>
        <Hero reduced={reduced} />
        <About reduced={reduced} />
        <Skills reduced={reduced} />
        <Projects />
        <Contact reduced={reduced} />
      </main>
      <Footer />
    </>
  )
}
