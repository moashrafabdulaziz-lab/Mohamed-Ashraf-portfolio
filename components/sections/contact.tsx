'use client'

import { useState } from 'react'
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { SITE } from '@/lib/site'
import { SectionLabel } from '@/components/section-label'
import { Reveal } from '@/components/reveal'
import { GithubMark, LinkedinMark } from '@/components/brand-icons'

export function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section
      id="contact"
      className="grain relative scroll-mt-24 overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index={t.contact.index} label={t.contact.label} />
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.95] text-balance">
                {t.contact.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
                {t.contact.lead}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.75} />
                  {t.contact.emailCta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3.5 font-mono text-sm transition-colors hover:border-foreground/40 hover:bg-secondary"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-pine" strokeWidth={2} />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                  )}
                  {copied ? t.contact.copied : SITE.email}
                </button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {t.contact.elsewhere}
              </div>
              <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border">
                <SocialRow
                  href={SITE.github}
                  label="GitHub"
                  handle={SITE.githubHandle}
                  icon={<GithubMark className="h-5 w-5" />}
                />
                <SocialRow
                  href={SITE.linkedin}
                  label="LinkedIn"
                  handle={SITE.linkedinHandle}
                  icon={<LinkedinMark className="h-5 w-5" />}
                />
                <SocialRow
                  href={`mailto:${SITE.email}`}
                  label="Email"
                  handle={SITE.email}
                  icon={<Mail className="h-5 w-5" strokeWidth={1.75} />}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialRow({
  href,
  label,
  handle,
  icon,
}: {
  href: string
  label: string
  handle: string
  icon: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 bg-card px-5 py-4 transition-colors hover:bg-secondary"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block truncate font-mono text-xs text-muted-foreground">
          {handle}
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}
