'use client'

import React, { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'

const experience = [
  {
    company: "Susty",
    location: "Dubai, UAE",
    roles: [
      { title: "Application Content Developer", date: "05/2025–Present" }
    ]
  },
  {
    company: "AIESEC in UAE",
    location: "Abu Dhabi",
    roles: [
      { title: "Marketing Local Vice President", date: "05/2026–Present" }
    ]
  },
  {
    company: "University Of Birmingham Dubai",
    location: "Dubai, UAE",
    roles: [
      { title: "Google Developer's Group Lead", date: "05/2026–Present" },
      { title: "Founder & VP, Food and Health Society", date: "09/2025–06/2026" },
      { title: "Lead Graphic Designer, Student Association", date: "09/2025–Present" }
    ]
  },
  {
    company: "Alyx Society",
    location: "Dubai, UAE",
    roles: [
      { title: "Director of Event Management", date: "10/2023–11/2024" },
      { title: "Media and Marketing Co-Head", date: "04/2023–10/2023" }
    ]
  },
  {
    company: "Unipreneur Inc.",
    location: "Dubai, UAE",
    roles: [
      { title: "Event Co-ordinator & Ambassador", date: "10/2023–12/2024" }
    ]
  },
  {
    company: "QuixMun",
    location: "Dubai, UAE",
    roles: [
      { title: "Head of Business Development", date: "08/2023–06/2024" }
    ]
  }
]

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress within the container for the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  return (
    <section id="experience" className="relative w-full bg-white text-[#111] py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-4 mb-16 text-left opacity-60">Timeline</h2>
        
        <div className="relative" ref={containerRef}>
          {/* Background Line */}
          <div className="absolute left-[15px] md:left-[31px] top-4 bottom-4 w-[2px] bg-gray-100 rounded-full" />
          
          {/* Animated Foreground Progress Line */}
          <motion.div 
            className="absolute left-[15px] md:left-[31px] top-4 bottom-4 w-[2px] bg-black origin-top rounded-full"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="flex flex-col gap-12">
            {experience.map((item, idx) => (
              <div key={idx} className="relative pl-12 md:pl-24 group">
                
                {/* Timeline Dot */}
                <div className="absolute left-[11px] md:left-[27px] top-[32px] w-[10px] h-[10px] rounded-full bg-white border-[2px] border-gray-300 z-10 transition-all duration-500 group-hover:scale-150 group-hover:border-black" />
                
                {/* Timeline Card */}
                <div className="bg-gray-50 border border-black/5 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500">
                  <div className="mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 bg-black/5 px-2 py-1 rounded-sm">{item.location}</span>
                    <h4 className="text-2xl md:text-4xl font-bold tracking-tight mt-4">{item.company}</h4>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {item.roles.map((role, roleIdx) => (
                      <div key={roleIdx} className={`flex flex-col md:flex-row md:items-end justify-between gap-2 ${roleIdx !== 0 ? 'pt-4 border-t border-black/5' : ''}`}>
                        <p className="text-lg md:text-xl font-semibold opacity-90">{role.title}</p>
                        <span className="text-xs font-bold opacity-40 uppercase tracking-widest shrink-0">{role.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
