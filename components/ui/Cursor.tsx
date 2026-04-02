'use client'

import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`
        dotRef.current.style.top = `${y}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`
        ringRef.current.style.top = `${y}px`
      }
    }

    const grow = () => {
      dotRef.current?.classList.add('cursor-grow')
      ringRef.current?.classList.add('cursor-ring-hide')
    }
    const shrink = () => {
      dotRef.current?.classList.remove('cursor-grow')
      ringRef.current?.classList.remove('cursor-ring-hide')
    }

    const setDark = () => {
      if (dotRef.current) dotRef.current.style.backgroundColor = '#0E0C09'
      if (ringRef.current) ringRef.current.style.borderColor = 'rgba(14,12,9,0.4)'
    }
    const setGold = () => {
      if (dotRef.current) dotRef.current.style.backgroundColor = ''
      if (ringRef.current) ringRef.current.style.borderColor = ''
    }

    const darkTargets = document.querySelectorAll('[data-cursor-dark]')
    darkTargets.forEach(el => {
      el.addEventListener('mouseenter', setDark)
      el.addEventListener('mouseleave', setGold)
    })

    const targets = document.querySelectorAll('a, button, [role="button"], input, select, label')
    targets.forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    document.addEventListener('mousemove', onMove)

    return () => {
      document.removeEventListener('mousemove', onMove)
      darkTargets.forEach(el => {
        el.removeEventListener('mouseenter', setDark)
        el.removeEventListener('mouseleave', setGold)
      })
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
        className="cursor-dot fixed pointer-events-none z-[9999] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber mix-blend-multiply transition-[width,height,background-color] duration-300"
        style={{ left: '-200px', top: '-200px' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/50 transition-[border-color,opacity] duration-300"
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
        .cursor-ring-hide {
          opacity: 0;
        }
      `}</style>
    </>
  )
}
