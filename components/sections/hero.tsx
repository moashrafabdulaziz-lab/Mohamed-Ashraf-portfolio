'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { ArrowDown, ArrowUpRight, MoveRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { SignatureMarquee } from '@/components/marquee'

export function Hero() {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90])
  const blockY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40])

  const nameLines = t.hero.name.split('\n')

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section
      id="home"
      ref={ref}
      className="grain relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:pt-40"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Text column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/50 px-3.5 py-1.5 font-mono text-xs text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pine opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pine" />
              </span>
              {t.hero.status}
              <span className="mx-1 text-border">·</span>
              <span className="text-foreground">{t.hero.role}</span>
            </motion.div>

            <h1 className="mt-6 font-display text-[clamp(2.75rem,9vw,6rem)] font-semibold leading-[0.92] text-balance">
              {nameLines.map((line, i) => (
                <motion.span key={i} variants={item} className="block">
                  {i === 1 ? (
                    <span className="text-primary">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl font-display text-xl text-foreground/90 text-pretty sm:text-2xl"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 max-w-xl leading-relaxed text-muted-foreground"
            >
              {t.hero.intro}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() =>
                  document
                    .getElementById('work')
                    ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
                }
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                {t.hero.ctaWork}
                <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
                }
                className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-foreground/40 hover:bg-secondary"
              >
                {t.hero.ctaContact}
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>

            {/* code × context × purpose */}
            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm"
            >
              {t.hero.triad.map((word, i) => (
                <span key={word} className="flex items-center gap-4">
                  <span
                    className={
                      i === 1 ? 'text-pine' : i === 2 ? 'text-primary' : ''
                    }
                  >
                    {word}
                  </span>
                  {i < t.hero.triad.length - 1 && (
                    <span className="text-border">✕</span>
                  )}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Portrait column */}
          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              {/* colored blocks behind — structural, not decorative blobs */}
              <motion.div
                style={{ y: blockY }}
                className="absolute -end-3 -top-3 h-24 w-24 rounded-2xl bg-pine/90"
                aria-hidden="true"
              />
              <motion.div
                style={{ y: blockY }}
                className="absolute -bottom-4 -start-4 h-28 w-28 rounded-2xl border border-primary/40"
                aria-hidden="true"
              />

              {/* portrait frame */}
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border bg-secondary">
                <motion.div style={{ y: imgY }} className="absolute inset-0">
                  <Image
                    src="/images/portrait.png"
                    alt="Mohamed Ashraf Abdul Aziz"
                    fill
                    priority
                    sizes="(max-width: 1024px) 24rem, 22rem"
                    className="object-cover object-top"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

                {/* floating identity chips */}
                <span className="absolute start-3 top-3 rounded-full bg-pine px-3 py-1 font-mono text-[11px] text-pine-foreground">
                  {t.hero.engineering}
                </span>
                <span className="absolute end-3 bottom-14 rounded-full bg-primary px-3 py-1 font-mono text-[11px] text-primary-foreground">
                  {t.hero.business}
                </span>

                {/* caption bar */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl border border-border/60 bg-background/70 px-3 py-2 backdrop-blur-md">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {t.hero.caption}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          <ArrowDown className="h-4 w-4 animate-bounce text-primary" />
          {t.hero.scroll}
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-10 max-w-none">
        <SignatureMarquee />
      </div>
    </section>
  )
}
