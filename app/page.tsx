import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Approach } from '@/components/sections/approach'
import { Work } from '@/components/sections/work'
import { Skills } from '@/components/sections/skills'
import { Path } from '@/components/sections/path'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Approach />
        <Work />
        <Skills />
        <Path />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
