'use client'

import React, { useEffect } from 'react'
import MinimalHero from '@/components/hero/MinimalHero'
import AboutSection from '@/components/ui/AboutSection'
import BentoGrid from '@/components/ui/BentoGrid'
import ExperienceSection from '@/components/ui/ExperienceSection'
import SkillsMarquee from '@/components/ui/SkillsMarquee'

export default function Home() {
  
  // Ensure the page loads at the very top (fixing the scroll bug)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="relative min-h-screen bg-white text-[#111] selection:bg-black selection:text-white pb-8">
      
      {/* New Minimal Framer Hero */}
      <MinimalHero />

      {/* About Section with Scroll Highlight */}
      <AboutSection />

      {/* Projects Section (Bento Grid) */}
      <BentoGrid />

      {/* Skills Marquee */}
      <SkillsMarquee />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Contact Section */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-32 flex flex-col items-center justify-center text-center">
        <h2 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-6">What's Next?</h2>
        <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-8">Let's Work Together</h3>
        <p className="max-w-xl mx-auto text-lg opacity-80 mb-12">
          Whether you have an ambitious idea or a massive project, I'm currently open for new opportunities and collaborations.
        </p>
        <a 
          href="mailto:nawfaljaffri@gmail.com"
          className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300"
        >
          Get In Touch
        </a>
      </section>

      {/* Footer */}
      <footer id="contact" className="w-full max-w-7xl mx-auto border-t border-gray-200 bg-white px-6 md:px-12 py-16 mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <p className="font-black text-lg tracking-tight">Nawfal ©2026</p>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">All rights reserved</p>
        </div>
        <div className="text-left md:text-right flex flex-col items-start md:items-end">
          <p className="font-bold text-sm uppercase tracking-widest opacity-60">Reach Out</p>
          <a href="mailto:nawfaljaffri@gmail.com" className="text-xl md:text-3xl font-black tracking-tighter hover:opacity-50 transition-opacity mt-2 inline-block">
            nawfaljaffri@gmail.com
          </a>
        </div>
      </footer>

    </main>
  )
}
