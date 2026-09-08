'use client'

import { useLanguage } from '@/lib/i18n'
import { SectionLabel } from '@/components/section-label'
import { Reveal } from '@/components/reveal'

export function Path() {
  const { t } = useLanguage()

  return (
    <section id="path" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index={t.path.index} label={t.path.label} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-none text-balance sm:text-5xl md:text-6xl">
              {t.path.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground text-pretty">
              {t.path.note}
            </p>
          </Reveal>
        </div>

        <ol className="relative mt-14 ms-3 border-s-2 border-border">
          {t.path.nodes.map((node, i) => (
            <Reveal key={node.k} delay={i * 0.06}>
              <li className="group relative ps-8 pb-12 last:pb-0 sm:ps-12">
                {/* node marker */}
                <span className="absolute -start-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-primary transition-transform duration-300 group-hover:scale-125">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                </span>

                <div className="flex flex-col gap-4 rounded-2xl border border-transparent p-1 transition-colors group-hover:border-border group-hover:bg-card sm:flex-row sm:items-baseline sm:gap-8 sm:p-5">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-pine/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-pine sm:w-40 sm:shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                    {node.tag}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold">
                      {node.k}
                    </h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground text-pretty">
                      {node.v}
                    </p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
