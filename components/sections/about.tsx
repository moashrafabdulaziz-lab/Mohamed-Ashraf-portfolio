'use client'

import { useLanguage } from '@/lib/i18n'
import { SectionLabel } from '@/components/section-label'
import { Reveal, Stagger, StaggerItem } from '@/components/reveal'

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index={t.about.index} label={t.about.label} />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl font-semibold leading-[1.1] text-balance sm:text-4xl md:text-5xl">
                {t.about.heading}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {t.about.body.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.05}>
                  <p className="text-pretty">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-1">
              {t.about.pillars.map((pillar) => (
                <StaggerItem key={pillar.k}>
                  <div className="h-full bg-card p-6 transition-colors hover:bg-secondary">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {pillar.k}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {pillar.v}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}
