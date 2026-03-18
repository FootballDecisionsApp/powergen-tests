'use client'

import { useEffect, useRef, useState } from 'react'

interface Chapter {
  eyebrow: string
  title: string
  body: string
  statValue: string
  statLabel: string
}

const chapters: Chapter[] = [
  {
    eyebrow: 'Двигател',
    title: 'Непрекъснато захранване',
    body: 'Четиритактов OHV двигател с въздушно охлаждане. Проектиран за 24/7 работа при пълно натоварване без деградация на мощността.',
    statValue: '72ч',
    statLabel: 'непрекъсната работа',
  },
  {
    eyebrow: 'AVR система',
    title: 'Стабилно напрежение',
    body: 'Автоматичният волтов регулатор поддържа изходното напрежение в рамките на ±1% — безопасно за сензорна електроника и промишлено оборудване.',
    statValue: '±1%',
    statLabel: 'отклонение на напрежението',
  },
  {
    eyebrow: 'Алтернатор',
    title: 'Медни намотки',
    body: '100% медни намотки — не алуминиеви. По-висока топлоустойчивост, по-нисък омичен отпор, по-дълъг живот при тежки условия.',
    statValue: '98%',
    statLabel: 'чисто синусно напрежение',
  },
  {
    eyebrow: 'Поддръжка',
    title: '15 години опит',
    body: 'Над 500 инсталации в България. Собствен сервизен екип, реакция до 4 часа, резервни части на склад.',
    statValue: '4ч',
    statLabel: 'максимално време за реакция',
  },
]

export function ScrollVideo() {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const rafRef        = useRef<number | null>(null)
  // seek queue: only one seek in flight at a time
  const isSeekingRef  = useRef(false)
  const pendingRef    = useRef<number | null>(null)

  const [activeChapter, setActiveChapter] = useState(0)
  const [showHint, setShowHint]           = useState(true)

  // ── Canvas draw + seek queue setup ──────────────────────────────────────
  useEffect(() => {
    const video  = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function drawFrame() {
      if (!video || !canvas || canvas.width === 0) return
      ctx!.drawImage(video, 0, 0, canvas.width, canvas.height)
    }

    function seek(progress: number) {
      if (!video || !isFinite(video.duration) || video.duration === 0) return
      isSeekingRef.current = true
      video.currentTime = progress * video.duration
    }

    function onMetadata() {
      if (!video || !canvas) return
      canvas.width  = video.videoWidth  || 1280
      canvas.height = video.videoHeight || 720
      // Draw frame 0
      seek(0)
    }

    function onSeeked() {
      // Only paint when the browser has a fully decoded frame ready
      drawFrame()
      isSeekingRef.current = false
      // Drain the queue — at most one pending seek at a time
      if (pendingRef.current !== null) {
        const p = pendingRef.current
        pendingRef.current = null
        seek(p)
      }
    }

    video.addEventListener('loadedmetadata', onMetadata)
    video.addEventListener('seeked', onSeeked)

    return () => {
      video.removeEventListener('loadedmetadata', onMetadata)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [])

  // ── Scroll → progress ───────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null

        const section = sectionRef.current
        if (!section) return

        const rect       = section.getBoundingClientRect()
        const scrolled   = -rect.top                              // px past section top
        const scrollable = section.offsetHeight - window.innerHeight
        const progress   = Math.max(0, Math.min(1, scrolled / scrollable))

        // Amber progress bar — direct DOM, zero re-renders
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress * 100}%`
        }

        // Chapter (0–3)
        setActiveChapter(Math.min(3, Math.floor(progress * 4)))
        setShowHint(progress < 0.05)

        // Seek: if a seek is in flight, queue latest progress (not every frame)
        const video = videoRef.current
        if (!video || !isFinite(video.duration) || video.duration === 0) return

        if (isSeekingRef.current) {
          // Overwrite pending — we only care about the latest position
          pendingRef.current = progress
        } else {
          isSeekingRef.current = true
          video.currentTime = progress * video.duration
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const chapter    = chapters[activeChapter]
  const chapterNum = String(activeChapter + 1).padStart(2, '0')

  return (
    <section ref={sectionRef} className="relative h-[600vh]">

      {/* Hidden video — only used for seeking, never rendered visibly */}
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        muted
        playsInline
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />

      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

          {/* ── Left: Canvas ──────────────────────────────────────────── */}
          <div className="relative bg-paper border-r border-border flex items-center justify-center h-[50vh] lg:h-full overflow-hidden">

            {/* Amber scrub bar — top edge */}
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-[2px] bg-amber z-10 w-0"
            />

            {/* Canvas shows fully-decoded frames — no partial-frame flicker */}
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-full w-auto h-auto p-6 lg:p-12"
            />

            {/* Chapter dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {chapters.map((_, i) => (
                <span
                  key={i}
                  className={`h-[3px] transition-all duration-300 ${
                    i === activeChapter ? 'w-4 bg-amber' : 'w-2 bg-border'
                  }`}
                />
              ))}
            </div>

            {/* Scroll hint */}
            <div
              className={`absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 pointer-events-none ${
                showHint ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-px h-8 bg-amber animate-pulse-dot" />
              <span className="font-mono text-[9px] tracking-[2px] uppercase text-dust whitespace-nowrap">
                Scroll за детайли
              </span>
            </div>
          </div>

          {/* ── Right: Text ───────────────────────────────────────────── */}
          <div className="bg-cream flex flex-col justify-center px-8 sm:px-10 lg:px-12 xl:px-16 h-[50vh] lg:h-full overflow-hidden">

            {/* Chapter counter */}
            <div className="flex items-center gap-3 mb-5 lg:mb-8">
              <span className="font-mono text-[10px] tracking-[2px] text-amber">
                {chapterNum}
              </span>
              <span className="flex-1 h-px bg-border" />
              <span className="font-mono text-[10px] tracking-[2px] text-dust">04</span>
            </div>

            {/* key forces remount → fadeUp plays on chapter change */}
            <div key={activeChapter} className="animate-fade-up-fast">
              <p className="font-mono text-[10px] tracking-[3px] uppercase text-amber mb-3 lg:mb-4">
                {chapter.eyebrow}
              </p>
              <h2 className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl text-black mb-4 lg:mb-5 leading-[0.95] tracking-tight">
                {chapter.title}
              </h2>
              <p className="font-sans font-light text-[14px] text-stone leading-relaxed max-w-sm mb-6 lg:mb-8">
                {chapter.body}
              </p>

              {/* Big stat */}
              <div className="border-l-2 border-amber pl-6">
                <p className="font-serif text-5xl lg:text-6xl font-light text-black leading-none mb-1">
                  {chapter.statValue}
                </p>
                <p className="font-mono text-[9px] tracking-[2px] uppercase text-dust">
                  {chapter.statLabel}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
