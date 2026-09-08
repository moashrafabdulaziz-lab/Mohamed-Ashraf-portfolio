'use client'

import { useLanguage } from '@/lib/i18n'
import { SectionLabel } from '@/components/section-label'
import { Reveal, Stagger, StaggerItem } from '@/components/reveal'

export function Skills() {
  const { t } = useLanguage()

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-y border-border bg-secondary/40 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index={t.skills.index} label={t.skills.label} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-none text-balance sm:text-5xl md:text-6xl">
              {t.skills.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground text-pretty">
              {t.skills.note}
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 border-t border-border">
          {t.skills.groups.map((group, i) => (
            <StaggerItem key={group.k}>
              <div className="group grid grid-cols-1 items-center gap-4 border-b border-border py-6 transition-colors hover:bg-card/60 md:grid-cols-12 md:gap-8 md:py-7">
                <div className="flex items-baseline gap-4 md:col-span-4">
                  <span className="font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                    {group.k}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2 md:col-span-8 md:justify-end">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-card px-4 py-2 font-mono text-sm text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
