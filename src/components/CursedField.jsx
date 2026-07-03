import { useEffect, useRef } from 'react'

export default function CursedField({ reduced }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let fw, fh, waveT = 0, raf

    function size() {
      fw = canvas.width = window.innerWidth
      fh = canvas.height = window.innerHeight
    }
    size()
    window.addEventListener('resize', size)

    function drawField() {
      ctx.clearRect(0, 0, fw, fh)
      ctx.fillStyle = '#08090a'
      ctx.fillRect(0, 0, fw, fh)

      const bands = 4
      for (let i = 0; i < bands; i++) {
        const isEm = i % 2 === 0
        const col = isEm ? '27,233,150' : '255,59,82'
        const amp = 26 + i * 8
        const freq = 0.0032 + i * 0.0007
        const speed = 0.006 + i * 0.0025
        const baseY = fh * (0.18 + i * 0.22)

        ctx.beginPath()
        ctx.moveTo(0, baseY)
        for (let x = 0; x <= fw; x += 16) {
          const y =
            baseY +
            Math.sin(x * freq + waveT * speed * 40 + i) * amp +
            Math.sin(x * freq * 2.3 - waveT * speed * 20) * (amp * 0.35)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(fw, fh)
        ctx.lineTo(0, fh)
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, baseY - amp, 0, fh)
        grad.addColorStop(0, `rgba(${col},0.05)`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.fill()
      }
      waveT += 1
    }

    function loop() {
      drawField()
      raf = requestAnimationFrame(loop)
    }

    if (!reduced) {
      loop()
    } else {
      drawField()
    }

    return () => {
      window.removeEventListener('resize', size)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none bg-void"
    />
  )
}
