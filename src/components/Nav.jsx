import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Technique' },
  { href: '#projects', label: 'Missions' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6vw] py-6 border-b transition-colors duration-400 ${
        scrolled ? 'border-line bg-void/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <div className="font-display text-xl tracking-wider flex items-center gap-2.5">
        <span className="w-[7px] h-[7px] rounded-full bg-emerald shadow-[0_0_10px_#1be996]" />
        SAKSHI
        <span className="w-[7px] h-[7px] rounded-full bg-emerald shadow-[0_0_10px_#1be996]" />
      </div>
      <div className="hidden md:flex gap-9">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            data-cursor-target
            className="group relative font-mono text-xs tracking-[0.12em] uppercase text-ash hover:text-bone transition-colors py-1.5"
          >
            {l.label}
            <span className="absolute left-0 bottom-0 h-px w-0 bg-gradient-to-r from-emerald to-crimson transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>
    </nav>
  )
}
