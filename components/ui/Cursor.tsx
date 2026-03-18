'use client'

import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mx = -200, my = -200

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`
        dotRef.current.style.top  = `${my}px`
      }
    }

    // Trail ring follows with slight delay
    let rafId: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    let rx = mx, ry = my

    const tick = () => {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`
        ringRef.current.style.top  = `${ry}px`
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    // Grow on interactive elements
    const grow = () => dotRef.current?.classList.add('cursor-grow')
    const shrink = () => dotRef.current?.classList.remove('cursor-grow')

    const targets = document.querySelectorAll('a, button, [role="button"], input, select, label')
    targets.forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    document.addEventListener('mousemove', onMove)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <>
      {/* Gold dot */}
      <div
        ref={dotRef}
        className="cursor-dot fixed pointer-events-none z-[9999] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber mix-blend-multiply transition-[width,height] duration-300"
        style={{ left: '-200px', top: '-200px' }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/50"
        style={{ left: '-200px', top: '-200px' }}
      />
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
        .cursor-grow {
          width: 48px !important;
          height: 48px !important;
          opacity: 0.35;
        }
      `}</style>
    </>
  )
}
