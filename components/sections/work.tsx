'use client'

import Image from 'next/image'
import { ArrowUpRight, Tag, Gavel, FileText, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { SITE } from '@/lib/site'
import { SectionLabel } from '@/components/section-label'
import { Reveal, Stagger, StaggerItem } from '@/components/reveal'
import { GithubMark } from '@/components/brand-icons'

const MODEL_ICONS = [Tag, Gavel, FileText]

export function Work() {
  const { t } = useLanguage()
  const a = t.work.assetx

  return (
    <section id="work" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index={t.work.index} label={t.work.label} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-none text-balance sm:text-5xl md:text-6xl">
              {t.work.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              {t.work.lead}
            </p>
          </Reveal>
        </div>

        {/* Case study */}
        <Reveal delay={0.05}>
          <article className="mt-14 overflow-hidden rounded-[2rem] border border-border bg-card">
            {/* header */}
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border p-6 sm:p-8">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-4xl font-semibold sm:text-5xl">
                    {a.name}
                  </h3>
                  <span className="mb-1 h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {a.kind}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-pine/40 bg-pine/10 px-3 py-1.5 font-mono text-xs text-pine">
                <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                {a.stage}
              </span>
            </div>

            {/* browser preview */}
            <div className="border-b border-border bg-secondary/50 p-4 sm:p-8">
              <a
                href={SITE.assetx}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl border border-border bg-background shadow-xl shadow-foreground/5 transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-primary/70" />
                  <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                  <span className="h-3 w-3 rounded-full bg-pine/60" />
                  <span className="mx-auto flex items-center gap-2 rounded-md bg-secondary px-3 py-1 font-mono text-[11px] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                    {a.previewBar}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary sm:aspect-[16/9]">
                  <Image
                    src="/images/assetx-preview.png"
                    alt={`${a.name} landing page preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60rem"
                    className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </a>
            </div>

            {/* summary + supply/demand */}
            <div className="grid gap-8 border-b border-border p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
              <p className="font-display text-xl leading-snug text-balance sm:text-2xl">
                {a.summary}
              </p>
              <SupplyDemand
                supply={a.supply}
                supplyDesc={a.supplyDesc}
                demand={a.demand}
                demandDesc={a.demandDesc}
                name={a.name}
              />
            </div>

            {/* problem / concept / differentiator */}
            <Stagger className="grid gap-px bg-border sm:grid-cols-3">
              {[a.problem, a.concept, a.differentiator].map((b, i) => (
                <StaggerItem key={i}>
                  <div className="h-full bg-card p-6 sm:p-8">
                    <div className="font-mono text-xs uppercase tracking-wider text-primary">
                      {String(i + 1).padStart(2, '0')} / {b.k}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {b.v}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* transaction models */}
            <div className="border-b border-border p-6 sm:p-8">
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {a.modelsLabel}
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {a.models.map((m, i) => {
                  const Icon = MODEL_ICONS[i]
                  return (
                    <div
                      key={m.k}
                      className="rounded-2xl border border-border bg-secondary/40 p-5 transition-colors hover:border-primary/40"
                    >
                      <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                      <div className="mt-3 font-display text-lg font-semibold">
                        {m.k}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{m.v}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* features + stack + CTA */}
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {a.featuresLabel}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {a.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-sm"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {a.stackLabel}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {a.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-md bg-pine/10 px-3 py-1.5 font-mono text-xs text-pine"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <a
                  href={SITE.assetx}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between gap-4 rounded-2xl bg-primary px-6 py-5 text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <span>
                    <span className="block font-display text-xl font-semibold">
                      {a.cta}
                    </span>
                    <span className="font-mono text-xs text-primary-foreground/80">
                      {a.ctaNote}
                    </span>
                  </span>
                  <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Beyond AssetX */}
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl border border-dashed border-border p-8 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <div className="font-mono text-xs uppercase tracking-wider text-primary">
                {t.work.moreLabel}
              </div>
              <p className="mt-3 text-muted-foreground text-pretty">
                {t.work.more}
              </p>
            </div>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-foreground/40 hover:bg-secondary"
            >
              <GithubMark className="h-4 w-4" />
              {t.work.moreCta}
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SupplyDemand({
  supply,
  supplyDesc,
  demand,
  demandDesc,
  name,
}: {
  supply: string
  supplyDesc: string
  demand: string
  demandDesc: string
  name: string
}) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-secondary/40 p-5 sm:gap-4">
      <Node color="pine" title={supply} desc={supplyDesc} />
      <div className="flex flex-col items-center gap-1">
        <ArrowRight className="h-5 w-5 text-muted-foreground rtl:rotate-180" />
        <span className="rounded-full bg-foreground px-2 py-0.5 font-mono text-[10px] text-background">
          {name}
        </span>
        <ArrowRight className="h-5 w-5 text-muted-foreground rtl:rotate-180" />
      </div>
      <Node color="primary" title={demand} desc={demandDesc} />
    </div>
  )
}

function Node({
  color,
  title,
  desc,
}: {
  color: 'pine' | 'primary'
  title: string
  desc: string
}) {
  return (
    <div className="flex-1 text-center">
      <div
        className={
          color === 'pine'
            ? 'mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-pine/15 font-display text-lg font-bold text-pine'
            : 'mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 font-display text-lg font-bold text-primary'
        }
      >
        {title.charAt(0)}
      </div>
      <div className="mt-2 text-sm font-semibold">{title}</div>
      <div className="mt-0.5 text-xs leading-tight text-muted-foreground">
        {desc}
      </div>
    </div>
  )
}
