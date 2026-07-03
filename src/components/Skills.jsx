import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { name: 'React.js', pct: 88 },
  { name: 'Node.js / Express', pct: 85 },
  { name: 'MongoDB', pct: 82 },
  { name: 'JavaScript (ES6+)', pct: 80 },
  { name: 'REST API Design', pct: 74 },
  { name: 'Payment Integration', pct: 70 },
  { name: 'Tailwind CSS', pct: 72 },
  { name: 'Git / Version Control', pct: 68 },
]

function SkillBar({ name, pct, reduced }) {
  const fillRef = useRef(null)
  const rowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: rowRef.current, start: 'top 90%' } })
      tl.to(fillRef.current, { width: `${pct}%`, duration: 1.1, ease: 'power2.out' })
        .to(fillRef.current, { boxShadow: '0 0 18px 3px rgba(27,233,150,0.7)', duration: 0.15, yoyo: true, repeat: 1 }, '-=0.2')
    }, rowRef)
    return () => ctx.revert()
  }, [pct])

  const onEnter = () => {
    if (reduced) return
    gsap.fromTo(fillRef.current, { filter: 'brightness(1.6)' }, { filter: 'brightness(1)', duration: 0.4 })
  }

  return (
    <div ref={rowRef} onMouseEnter={onEnter} data-cursor-target className="group py-[18px] border-b border-line relative cursor-pointer">
      <div className="flex justify-between items-baseline mb-2.5">
        <span className="text-base font-semibold text-bone">{name}</span>
        <span className="font-mono text-[13px] text-ash group-hover:text-crimson transition-colors">{pct}%</span>
      </div>
      <div className="h-1 bg-line relative overflow-hidden">
        <div
          ref={fillRef}
          className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-emerald-dim to-emerald shadow-[0_0_10px_rgba(27,233,150,0.5)] group-hover:from-crimson-dim group-hover:to-crimson group-hover:shadow-[0_0_14px_rgba(255,59,82,0.6)] transition-colors"
        />
      </div>
    </div>
  )
}

export default function Skills({ reduced }) {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const ruleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { opacity: 0, x: -32 }, {
        opacity: 1, x: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 90%' },
      })
      gsap.fromTo(ruleRef.current, { scaleX: 0 }, {
        scaleX: 1, duration: 0.7, ease: 'power2.out', transformOrigin: 'left',
        scrollTrigger: { trigger: headRef.current, start: 'top 90%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative px-[6vw] py-[130px]">
      <div ref={headRef} className="flex items-baseline gap-4 mb-14">
        <span className="font-mono text-xs text-crimson tracking-[0.18em] uppercase">Technique Mastery</span>
        <div ref={ruleRef} className="flex-1 h-px bg-line" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3.5">
        {SKILLS.map((s) => (
          <SkillBar key={s.name} {...s} reduced={reduced} />
        ))}
      </div>
    </section>
  )
}
