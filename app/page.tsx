import React from 'react'
import MinimalHero from '@/components/hero/MinimalHero'
import AboutSection from '@/components/ui/AboutSection'
import BentoGrid from '@/components/ui/BentoGrid'
import ExperienceSection from '@/components/ui/ExperienceSection'
import ScrollToTop from '@/components/ui/ScrollToTop'
import VisualExperiments from '@/components/ui/VisualExperiments'
import { client } from '@/lib/sanity/client'
import SkillsMarquee from '@/components/ui/SkillsMarquee'
import FloatingNav from '@/components/ui/FloatingNav'
import CursorHover from '@/components/ui/CursorHover'

export const dynamic = 'force-dynamic'
async function getPosters() {
  return client.fetch(`
    *[_type == "poster"] | order(coalesce(order, 999) asc, _createdAt desc) {
      _id,
      title,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      date
    }
  `)
}

export default async function Home() {
  const posters = await getPosters()

  return (
    <main className="relative min-h-screen bg-white text-[#111] selection:bg-black selection:text-white pb-8">
      <ScrollToTop />
      <FloatingNav />

      {/* New Minimal Framer Hero */}
      <MinimalHero />

      {/* About Section with Scroll Highlight */}
      <AboutSection />

      {/* Projects Section (Bento Grid) */}
      <BentoGrid />

      {/* Skills Marquee (No title, just pills between Works and Experiments) */}
      <SkillsMarquee />

      {/* Visual Experiments (Archive) */}
      <VisualExperiments items={posters} />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Contact Section */}
      <section id="contact" className="w-full max-w-[1300px] mx-auto px-6 md:px-12 py-16 flex flex-col items-center justify-center text-center">
        <h2 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-6">What's Next?</h2>
        <h3 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">Let's Work Together</h3>
        <p className="max-w-xl mx-auto text-lg opacity-80 mb-12">
          Whether you have an ambitious idea or a massive project, I'm currently open for new opportunities and collaborations.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CursorHover text="SAY HI" className="inline-block">
            <a 
              href="mailto:nawfaljafri@gmail.com"
              className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 inline-block"
            >
              Get In Touch
            </a>
          </CursorHover>
          <CursorHover text="READ" className="inline-block">
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 text-[#111] px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 hover:scale-105 transition-all duration-300 inline-block"
            >
              View Resume
            </a>
          </CursorHover>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-[1300px] mx-auto border-t border-gray-200 bg-white px-6 md:px-12 py-8 mt-4 mb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <p className="font-bold text-lg tracking-tight">Nawfal ©2026</p>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">All rights reserved</p>
        </div>
        <div className="text-left md:text-right flex flex-col items-start md:items-end">
          <p className="font-bold text-sm uppercase tracking-widest opacity-60">Reach Out</p>
          <CursorHover text="COPY">
            <a href="mailto:nawfaljafri@gmail.com" className="text-xl md:text-3xl font-bold tracking-tight hover:opacity-50 transition-opacity mt-2 inline-block">
              nawfaljafri@gmail.com
            </a>
          </CursorHover>
          <CursorHover text="CONNECT">
            <a href="https://www.linkedin.com/in/nawfaljaffri/" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mt-4 inline-block">
              LinkedIn
            </a>
          </CursorHover>
        </div>
      </footer>

    </main>
  )
}
