'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { useActiveSection } from '@/lib/use-active-section'
import { cn } from '@/lib/utils'

const SECTION_IDS = [
  'home',
  'about',
  'approach',
  'work',
  'skills',
  'path',
  'contact',
]

export function SiteNav() {
  const { t, lang, toggle } = useLanguage()
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = SECTION_IDS.map((id) => ({
    id,
    label: t.nav[id as keyof typeof t.nav],
  }))

  const go = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el)
      el.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'start',
      })
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <motion.nav
          aria-label={t.a11y.primaryNav}
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? 'color-mix(in oklch, var(--background) 72%, transparent)'
              : 'color-mix(in oklch, var(--background) 40%, transparent)',
          }}
          className={cn(
            'flex w-full max-w-3xl items-center gap-1 rounded-full border border-border/70 px-2 py-2 backdrop-blur-xl transition-shadow',
            scrolled ? 'shadow-lg shadow-foreground/5' : 'shadow-none',
          )}
        >
          {/* Monogram */}
          <button
            onClick={() => go('home')}
            className="group flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 font-display text-sm font-semibold"
          >
            <span className="tracking-tight">MA</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-150" />
          </button>

          {/* Desktop links */}
          <ul className="mx-auto hidden items-center gap-0.5 md:flex">
            {links.map((l) => {
              const isActive = active === l.id
              return (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={cn(
                      'relative rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    {l.label}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="ms-auto flex shrink-0 items-center gap-1 md:ms-0">
            <LangToggle
              lang={lang}
              onToggle={toggle}
              label={lang === 'en' ? t.a11y.toArabic : t.a11y.toEnglish}
            />
            <ThemeToggle label={t.a11y.toggleTheme} />
            <button
              onClick={() => setOpen(true)}
              aria-label={t.a11y.openMenu}
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary md:hidden"
            >
              <Menu className="h-4.5 w-4.5" strokeWidth={1.75} />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="font-display text-lg font-semibold">
                MA<span className="text-primary">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label={t.a11y.closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>
            <nav className="flex flex-col px-6 pt-10">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.05 }}
                  onClick={() => go(l.id)}
                  className="flex items-baseline justify-between border-b border-border/60 py-5 text-start"
                >
                  <span
                    className={cn(
                      'font-display text-3xl font-medium',
                      active === l.id ? 'text-primary' : 'text-foreground',
                    )}
                  >
                    {l.label}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function LangToggle({
  lang,
  onToggle,
  label,
}: {
  lang: string
  onToggle: () => void
  label: string
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={label}
      className="group relative flex h-9 items-center gap-1.5 rounded-full border border-border/70 px-3 font-mono text-xs transition-colors hover:border-primary/50"
    >
      <span
        className={cn(
          'transition-colors',
          lang === 'en' ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        EN
      </span>
      <span className="text-border">/</span>
      <span
        className={cn(
          'font-arabic transition-colors',
          lang === 'ar' ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        ع
      </span>
    </button>
  )
}

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" strokeWidth={1.75} />
        ) : (
          <Moon className="h-4 w-4" strokeWidth={1.75} />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  )
}
