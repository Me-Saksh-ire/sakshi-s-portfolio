import gsap from 'gsap'

/**
 * Spawns a single expanding ring at (x, y) and removes itself when done.
 */
export function spawnShockwave(x, y, color = '#1be996') {
  const ring = document.createElement('div')
  ring.style.cssText = `
    position:fixed;left:${x}px;top:${y}px;width:14px;height:14px;
    border:1.5px solid ${color};border-radius:50%;transform:translate(-50%,-50%);
    pointer-events:none;z-index:9998;opacity:0.9;mix-blend-mode:screen;
  `
  document.body.appendChild(ring)
  gsap.to(ring, {
    width: 260,
    height: 260,
    opacity: 0,
    borderWidth: 0.5,
    duration: 0.9,
    ease: 'power2.out',
    onComplete: () => ring.remove(),
  })
}
