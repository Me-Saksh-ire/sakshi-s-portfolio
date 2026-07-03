import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CursorEmber({ reduced, isTouch }) {
  const emberRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (reduced || isTouch) return

    const ember = emberRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function size() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    size()
    window.addEventListener('resize', size)

    const emberX = gsap.quickTo(ember, 'x', { duration: 0.35, ease: 'power3.out' })
    const emberY = gsap.quickTo(ember, 'y', { duration: 0.35, ease: 'power3.out' })

    let trail = []

    function onMove(e) {
      emberX(e.clientX)
      emberY(e.clientY)
      trail.push({ x: e.clientX, y: e.clientY, life: 1 })
      if (trail.length > 40) trail.shift()

      const el = document.elementFromPoint(e.clientX, e.clientY)
      const isTarget = el && el.closest('a, button, [data-cursor-target]')
      ember.classList.toggle('strike', !!isTarget)
      gsap.to(ember, { scale: isTarget ? 1.8 : 1, duration: 0.25, overwrite: true })
    }
    window.addEventListener('mousemove', onMove)

    let raf
    function drawTrail() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < trail.length - 1; i++) {
        const p = trail[i]
        const n = trail[i + 1]
        p.life *= 0.94
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(n.x, n.y)
        const em = i % 2 === 0
        ctx.strokeStyle = em
          ? `rgba(27,233,150,${p.life * 0.45})`
          : `rgba(255,59,82,${p.life * 0.35})`
        ctx.lineWidth = Math.max(0.5, p.life * 3)
        ctx.lineCap = 'round'
        ctx.stroke()
      }
      trail = trail.filter((p) => p.life > 0.03)
      raf = requestAnimationFrame(drawTrail)
    }
    drawTrail()

    return () => {
      window.removeEventListener('resize', size)
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced, isTouch])

  if (reduced || isTouch) return null

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-[9999] pointer-events-none" />
      <div
        ref={emberRef}
        className="ember fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, #fff, #1be996 45%, transparent 75%)',
          boxShadow: '0 0 14px 4px #1be996, 0 0 30px 8px rgba(27,233,150,0.35)',
        }}
      />
      <style>{`
        .ember.strike {
          background: radial-gradient(circle, #fff, #ff3b52 45%, transparent 75%) !important;
          box-shadow: 0 0 14px 4px #ff3b52, 0 0 30px 8px rgba(255,59,82,0.4) !important;
        }
      `}</style>
    </>
  )
}
