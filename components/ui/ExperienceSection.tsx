'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const experience = [
  { company: "Susty", location: "Dubai, UAE", roles: [{ title: "Application Content Developer", date: "05/2025–Present" }] },
  { company: "AIESEC in UAE", location: "Abu Dhabi", roles: [{ title: "Marketing Local Vice President", date: "05/2026–Present" }] },
  { company: "University Of Birmingham Dubai", location: "Dubai, UAE", roles: [{ title: "Google Developer's Group Lead", date: "05/2026–Present" }, { title: "Founder & VP, Food and Health Society", date: "09/2025–06/2026" }, { title: "Lead Graphic Designer, Student Association", date: "09/2025–Present" }] },
  { company: "Alyx Society", location: "Dubai, UAE", roles: [{ title: "Director of Event Management", date: "10/2023–11/2024" }, { title: "Media and Marketing Co-Head", date: "04/2023–10/2023" }] },
  { company: "Unipreneur Inc.", location: "Dubai, UAE", roles: [{ title: "Event Co-ordinator & Ambassador", date: "10/2023–12/2024" }] },
  { company: "QuixMun", location: "Dubai, UAE", roles: [{ title: "Head of Business Development", date: "08/2023–06/2024" }] }
]

const ExperienceCard = ({ item }: { item: any }) => (
  <div className="w-full bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group text-left rounded-[2rem] p-6 z-30">
    <div className="mb-4">
      <span className="text-[9px] font-bold uppercase tracking-widest opacity-50 bg-black/5 px-2 py-1 rounded-sm">{item.location}</span>
      <h4 className="text-xl font-bold tracking-tight mt-2 leading-tight">{item.company}</h4>
    </div>
    
    <div className="flex flex-col gap-3">
      {item.roles.map((role: any, roleIdx: number) => (
        <div key={roleIdx} className={`flex flex-col gap-1 ${roleIdx !== 0 ? 'pt-3 border-t border-black/5' : ''}`}>
          <p className="text-sm font-semibold opacity-90 leading-snug">{role.title}</p>
          <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">{role.date}</span>
        </div>
      ))}
    </div>
  </div>
)

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  return (
    <section id="experience" className="relative w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Matching 'Selected Works' format */}
        <div className="mb-24">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black/10 pb-4 mb-4 opacity-80">
            Professional Timeline
          </h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter">Experience</h3>
        </div>
        
        <div className="relative w-full" ref={containerRef}>
          
          {/* Desktop Central Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-3 bg-gray-200 -translate-x-1/2 rounded-full z-0" />
          <motion.div 
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-3 bg-black -translate-x-1/2 rounded-full origin-top z-10"
            style={{ scaleY: smoothProgress }}
          />

          {/* Mobile Left Line */}
          <div className="md:hidden absolute left-4 top-4 bottom-4 w-2 bg-gray-200 -translate-x-1/2 rounded-full z-0" />
          <motion.div 
            className="md:hidden absolute left-4 top-4 bottom-4 w-2 bg-black -translate-x-1/2 rounded-full origin-top z-10"
            style={{ scaleY: smoothProgress }}
          />

          {/* Mobile Layout (Standard 1 column) */}
          <div className="md:hidden flex flex-col gap-12 w-full pl-10 relative z-20">
            {experience.map((item, i) => (
              <div key={i} className="relative w-full group">
                <div className="absolute top-12 -left-10 w-10 h-1 bg-gray-200 group-hover:bg-black transition-colors duration-500 z-0" />
                <div className="absolute top-12 -left-[20px] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-gray-300 group-hover:border-black group-hover:scale-125 transition-all duration-500 z-20" />
                <ExperienceCard item={item} />
              </div>
            ))}
          </div>

          {/* Desktop Layout (Masonry 2 column alternating) */}
          <div className="hidden md:flex flex-row gap-16 relative z-20">
            
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-12">
              {experience.map((item, i) => {
                if (i % 2 !== 0) return null
                return (
                  <div key={i} className="relative w-full group">
                    <div className="absolute top-16 -right-8 w-8 h-1 bg-gray-200 group-hover:bg-black transition-colors duration-500 z-0" />
                    <div className="absolute top-16 -right-8 translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-[4px] border-gray-200 group-hover:border-black group-hover:scale-125 transition-all duration-500 z-20" />
                    <ExperienceCard item={item} />
                  </div>
                )
              })}
            </div>

            {/* Right Column (Staggered) */}
            <div className="flex-1 flex flex-col gap-12 pt-32">
              {experience.map((item, i) => {
                if (i % 2 === 0) return null
                return (
                  <div key={i} className="relative w-full group">
                    <div className="absolute top-16 -left-8 w-8 h-1 bg-gray-200 group-hover:bg-black transition-colors duration-500 z-0" />
                    <div className="absolute top-16 -left-8 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-[4px] border-gray-200 group-hover:border-black group-hover:scale-125 transition-all duration-500 z-20" />
                    <ExperienceCard item={item} />
                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
