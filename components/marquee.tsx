'use client'

import { useLanguage } from '@/lib/i18n'

export function SignatureMarquee() {
  const { lang } = useLanguage()

  const segment =
    lang === 'ar' ? 'هندسة البرمجيات' : 'Software Engineering'
  const segment2 = lang === 'ar' ? 'التفكير في الأعمال' : 'Business Thinking'

  const items = Array.from({ length: 6 })

  return (
    <div className="relative flex overflow-hidden border-y border-border/70 py-4 sm:py-5">
      <div className="marquee-track flex shrink-0 items-center gap-6 whitespace-nowrap pe-6">
        {items.map((_, i) => (
          <span key={`a-${i}`} className="flex items-center gap-6">
            <span className="font-display text-xl font-medium sm:text-2xl">
              {segment}
            </span>
            <span className="text-primary">✕</span>
            <span className="font-display text-xl font-medium text-muted-foreground sm:text-2xl">
              {segment2}
            </span>
            <span className="text-pine">/</span>
          </span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="marquee-track flex shrink-0 items-center gap-6 whitespace-nowrap pe-6"
      >
        {items.map((_, i) => (
          <span key={`b-${i}`} className="flex items-center gap-6">
            <span className="font-display text-xl font-medium sm:text-2xl">
              {segment}
            </span>
            <span className="text-primary">✕</span>
            <span className="font-display text-xl font-medium text-muted-foreground sm:text-2xl">
              {segment2}
            </span>
            <span className="text-pine">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}
