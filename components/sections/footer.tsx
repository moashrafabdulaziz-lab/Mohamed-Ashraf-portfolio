'use client'

import { ArrowUp } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-semibold">
            MA<span className="text-primary">.</span>
          </span>
          <span className="text-sm text-muted-foreground">
            {t.footer.built}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {t.footer.tagline}
          </span>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                  .matches
                  ? 'auto'
                  : 'smooth',
              })
            }
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            aria-label={t.contact.backTop}
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-border/60 pt-6">
        <span className="font-mono text-xs text-muted-foreground">
          © {year} Mohamed Ashraf Abdul Aziz — {t.footer.rights}
        </span>
      </div>
    </footer>
  )
}
