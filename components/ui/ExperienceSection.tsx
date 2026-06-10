'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Add a premium spring physics to the line drawing
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })

  const [cols, setCols] = useState(3)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateCols = () => {
      if (window.innerWidth < 768) setCols(1)
      else if (window.innerWidth < 1024) setCols(2)
      else setCols(3)
    }
    updateCols()
    window.addEventListener('resize', updateCols)
    return () => window.removeEventListener('resize', updateCols)
  }, [])

  // Pad the array so the Grid auto-placement always has complete rows
  const paddedExperience = [...experience]
  while (paddedExperience.length % cols !== 0) {
    paddedExperience.push({ isPlaceholder: true } as any)
  }

  const rows = Math.ceil(paddedExperience.length / cols)

  // Generate the Snake Path coordinates
  let d = ""
  for (let i = 0; i < experience.length; i++) {
    const r = Math.floor(i / cols)
    const c = r % 2 === 0 ? (i % cols) : (cols - 1 - (i % cols))
    const x = (c + 0.5) * (100 / cols)
    const y = (r + 0.5) * (100 / rows)
    if (i === 0) d += `M ${x} ${y} `
    else d += `L ${x} ${y} `
  }

  // Calculate the visual order for the grid items to match the snake path
  const getOrder = (i: number) => {
    const r = Math.floor(i / cols)
    if (r % 2 === 0) return i // Left to Right
    const start = r * cols
    const offset = i - start
    return start + (cols - 1 - offset) // Right to Left
  }

  if (!mounted) return <section className="h-screen" /> // Prevent hydration flash

  return (
    <section id="experience" className="relative w-full bg-white text-[#111] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-16 text-center uppercase">Experience</h2>
        
        <div className="relative w-full" ref={containerRef}>
          
          {/* SVG Snake Line Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d={d} 
              fill="none" 
              stroke="#f3f4f6" // Gray track
              strokeWidth="12" 
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>

          {/* SVG Snake Line Foreground (Animated) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              d={d} 
              fill="none" 
              stroke="#111" // Black fill
              strokeWidth="12" 
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress }}
            />
          </svg>

          {/* Grid of Cards */}
          <div 
            className="grid w-full h-full relative z-20"
            style={{ 
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridAutoRows: '1fr'
            }}
          >
            {paddedExperience.map((item: any, i) => (
              <div 
                key={i} 
                className="p-4 md:p-6 w-full h-full flex flex-col"
                style={{ order: getOrder(i) }}
              >
                {!item.isPlaceholder && (
                  <div className="w-full h-full bg-white border-2 border-black/5 rounded-[2rem] p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-black/20 transition-all duration-300 flex flex-col relative group">
                    {/* Inner Content */}
                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 bg-gray-100 px-2 py-1 rounded-md">{item.location}</span>
                      <h4 className="text-xl md:text-2xl font-bold tracking-tight mt-3 leading-tight">{item.company}</h4>
                    </div>
                    
                    <div className="flex flex-col gap-3 flex-grow justify-end mt-4">
                      {item.roles.map((role, roleIdx) => (
                        <div key={roleIdx} className={`flex flex-col gap-1 ${roleIdx !== 0 ? 'pt-3 border-t border-black/5' : ''}`}>
                          <p className="text-sm md:text-base font-semibold opacity-90 leading-snug">{role.title}</p>
                          <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{role.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  )
}
