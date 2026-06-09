'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
  const targetRef = useRef<HTMLDivElement>(null)
  
  // Creates a horizontal scroll effect mapped to the vertical scroll of the targetRef container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Map 0 -> 1 scroll progress to 0% -> -80% horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])

  return (
    <section ref={targetRef} id="experience" className="relative h-[300vh] bg-white text-[#111]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Absolute Background Title */}
        <div className="absolute top-12 left-6 md:left-12 z-10 w-[90vw]">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-4 mb-4 text-left">Timeline</h2>
          <h3 className="text-4xl md:text-6xl font-semibold tracking-tight text-left">Professional Experience</h3>
        </div>

        {/* Scrolling Cards */}
        <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-12 pt-32 pr-[50vw]">
          {experience.map((item, idx) => (
            <div 
              key={idx} 
              className="group w-[85vw] md:w-[40vw] h-[60vh] bg-gray-50 hover:bg-black hover:text-white transition-colors duration-500 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between shrink-0 shadow-sm border border-black/5"
            >
               <div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-60 transition-opacity">{item.location}</span>
                  <h4 className="text-3xl md:text-5xl font-medium tracking-tight mt-4">{item.company}</h4>
               </div>
               <div className="flex flex-col gap-6 overflow-y-auto pr-4 custom-scrollbar">
                 {item.roles.map((role, roleIdx) => (
                   <div key={roleIdx} className={`flex flex-col ${roleIdx !== 0 ? 'pt-6 border-t border-black/10 group-hover:border-white/20' : ''} transition-colors duration-500`}>
                     <p className="text-xl md:text-2xl font-medium opacity-90">{role.title}</p>
                     <span className="text-xs font-bold opacity-40 uppercase tracking-widest mt-2">{role.date}</span>
                   </div>
                 ))}
               </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
