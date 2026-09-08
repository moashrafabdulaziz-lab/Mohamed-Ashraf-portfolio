'use client'

import { Terminal, Briefcase, Check } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { SectionLabel } from '@/components/section-label'
import { Reveal } from '@/components/reveal'

export function Approach() {
  const { t } = useLanguage()

  return (
    <section
      id="approach"
      className="scroll-mt-24 border-y border-border bg-secondary/40 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index={t.approach.index} label={t.approach.label} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl md:text-6xl">
              {t.approach.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              {t.approach.lead}
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 grid gap-5 md:grid-cols-2">
          {/* Engineering — pine */}
          <Reveal delay={0.05}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pine text-pine-foreground">
                  <Terminal className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-pine">
                    {t.approach.eng.tag}
                  </div>
                  <div className="font-display text-xl font-semibold">
                    {t.approach.eng.title}
                  </div>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {t.approach.eng.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-pine" strokeWidth={2} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Business — persimmon */}
          <Reveal delay={0.12}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Briefcase className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-primary">
                    {t.approach.biz.tag}
                  </div>
                  <div className="font-display text-xl font-semibold">
                    {t.approach.biz.title}
                  </div>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {t.approach.biz.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-5 flex items-center gap-4 rounded-3xl border border-dashed border-border bg-card/50 p-8">
            <span className="hidden font-display text-4xl font-semibold text-primary sm:block">
              ✕
            </span>
            <p className="font-display text-xl leading-snug text-balance sm:text-2xl">
              {t.approach.intersection}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
