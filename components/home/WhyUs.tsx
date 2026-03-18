import Link from 'next/link'

const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10 text-amber" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z"/>
        <path d="M14 20 L18 24 L26 16"/>
      </svg>
    ),
    title: 'CE Сертифицирани',
    body: 'Всички генератори отговарят на европейските стандарти за качество и безопасност.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10 text-amber" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="16"/>
        <path d="M20 10 L20 20 L28 24"/>
      </svg>
    ),
    title: '24/7 Поддръжка',
    body: 'Нашият сервизен екип е на разположение денонощно за аварийна помощ.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10 text-amber" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="14" width="28" height="20" rx="2"/>
        <path d="M14 14 L14 10 C14 7 18 4 20 4 C22 4 26 7 26 10 L26 14"/>
      </svg>
    ),
    title: '24 Месеца Гаранция',
    body: 'Пълна гаранция на всички компоненти включително двигател и алтернатор.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10 text-amber" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 20 C8 13 13 8 20 8 C27 8 32 13 32 20"/>
        <path d="M4 24 L8 20 L12 24"/>
        <path d="M36 16 L32 20 L28 16"/>
        <circle cx="20" cy="26" r="6"/>
      </svg>
    ),
    title: 'Безплатна Доставка',
    body: 'Доставяме и монтираме на обекта в рамките на цяла България.',
  },
]

export function WhyUs() {
  return (
    <section className="bg-navy py-20 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Left: text content */}
        <div>
          <p className="flex items-center gap-3 mb-6 font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
            <span className="w-7 h-px bg-amber shrink-0" />
            Защо PlayCube
          </p>
          <h2 className="font-display text-[48px] sm:text-[60px] lg:text-[72px] leading-[0.93] text-white">
            ПОВЕЧЕ<br />
            ОТ <span className="text-amber">20 ГОДИНИ</span><br />
            ОПИТ
          </h2>
          <p className="mt-6 font-sans font-light text-[15px] leading-relaxed text-white/45 max-w-[400px]">
            Специализирани в надеждни решения за захранване за промишлени обекти, болници, центрове за данни и критична инфраструктура в цяла България и региона.
          </p>
          <div className="mt-10">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-amber text-navy-dk font-mono font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-amber-light hover:-translate-y-0.5"
            >
              Разгледай продуктите →
            </Link>
          </div>
        </div>

        {/* Right: 2×2 trust cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 bg-white/[0.04]">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="bg-navy p-8 sm:p-9 border border-amber/[0.08] transition-all duration-300 hover:bg-navy-lt/30 hover:border-amber/25 cursor-default"
            >
              <div className="mb-5">{item.icon}</div>
              <h3 className="font-display text-[20px] text-white tracking-[0.03em] mb-2.5">
                {item.title}
              </h3>
              <p className="font-sans font-light text-[13px] leading-relaxed text-white/40">
                {item.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
